package com.example.backend.service;

import com.example.backend.config.VNPayConfig;
import com.example.backend.dto.EnrollStudentDto;
import com.example.backend.entity.Course;
import com.example.backend.entity.CourseProgress;
import com.example.backend.entity.RoleEnum;
import com.example.backend.entity.User;
import com.example.backend.model.MailRequest;
import com.example.backend.repository.CourseProgressRepository;
import com.example.backend.repository.CourseRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.utils.types.OrderInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import com.fasterxml.jackson.databind.*;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PaymentService {
    private final CourseRepository _courseRepository;
    private final CourseProgressRepository _courseProgressRepository;
    private final UserRepository _userRepository;
    private final MailService _mailService;
    private final TemplateEngine _templateEngine;

    public PaymentService(CourseRepository courseRepository, CourseProgressRepository courseProgressRepository, UserRepository userRepository, MailService mailService, TemplateEngine templateEngine) {
        this._courseRepository = courseRepository;
        this._courseProgressRepository = courseProgressRepository;
        this._userRepository = userRepository;
        this._mailService = mailService;
        this._templateEngine = templateEngine;
    }

    public String enrollStudents(EnrollStudentDto enrollStudentDto, Integer userId) throws MessagingException {
        User user = _userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getRole().getName().equals(RoleEnum.STUDENT)) {
            throw new RuntimeException("Only students can enroll in courses");
        }
        for(Long courseId : enrollStudentDto.getCourseIds()) {
            Course course = _courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
            if(course.getStudentsEnrolled() == null) {
                course.setStudentsEnrolled(new ArrayList<>());
            }
            if(course.getStudentsEnrolled().contains(user)) {
                throw new RuntimeException("User already enrolled in course");
            }
            course.getStudentsEnrolled().add(user);
            _courseRepository.save(course);
            CourseProgress courseProgress = new CourseProgress();
            courseProgress.setUser(user);
            courseProgress.setCourse(course);
            CourseProgress progress = _courseProgressRepository.save(courseProgress);
            if(user.getCourses() == null) {
                user.setCourses(new ArrayList<>());
                user.setCourseProgress(new ArrayList<>());
            }
            user.getCourses().add(course);
            user.getCourseProgress().add(progress);
            _userRepository.save(user);

            Context context = new Context();
            context.setVariable("name", user.getFullName());
            context.setVariable("courseName", course.getCourseName());
            String processedString = _templateEngine.process("CourseEnrollmentEmail", context);
            MailRequest mailRequest = new MailRequest(user.getEmail(), "Successfully Enrolled into " + course.getCourseName(), processedString, true);
            _mailService.sendMail(mailRequest);
        }

        return "Enrolled successfully";
    }

    public String createOrder(HttpServletRequest request, EnrollStudentDto enrollStudentDto, Integer userId, String urlReturn) throws JsonProcessingException {
        User user = _userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (!user.getRole().getName().equals(RoleEnum.STUDENT)) {
            throw new RuntimeException("Only students can enroll in courses");
        }
        Double totalAmount = 0.0;
        for(Long courseId : enrollStudentDto.getCourseIds()) {
            Course course = _courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
            if(course.getStudentsEnrolled() != null && course.getStudentsEnrolled().contains(user)) {
                throw new RuntimeException("User already enrolled in course");
            }
            totalAmount += course.getPrice();
        }
        // Config VNPay
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String vnp_TxnRef = VNPayConfig.getRandomNumber(8);
        String vnp_IpAddr = VNPayConfig.getIpAddress(request);
        String vnp_TmnCode = VNPayConfig.STATIC_vnp_TmnCode;
        String orderType = "order-type";
        OrderInfo objOrderInfo = OrderInfo.builder()
                .courseIds(enrollStudentDto.getCourseIds())
                .userId(userId)
                .build();
        ObjectMapper objectMapper = new ObjectMapper();
        String orderInfor = objectMapper.writeValueAsString(objOrderInfo);

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        DecimalFormat df = new DecimalFormat("#");
        String amountString = df.format(totalAmount * 100);
        vnp_Params.put("vnp_Amount", amountString);
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", orderInfor);
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = "vn";
        vnp_Params.put("vnp_Locale", locate);

        urlReturn += VNPayConfig.STATIC_vnp_Returnurl;
        vnp_Params.put("vnp_ReturnUrl", urlReturn);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();

        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                try {
                    hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                    //Build query
                    query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                    query.append('=');
                    query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                } catch (UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }

        String queryUrl = query.toString();
        String salt = VNPayConfig.STATIC_vnp_HashSecret;
        String vnp_SecureHash = VNPayConfig.hmacSHA512(salt, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = VNPayConfig.STATIC_vnp_PayUrl + "?" + queryUrl;
        return paymentUrl;
    }

    public int orderReturn(HttpServletRequest request) throws MessagingException, JsonProcessingException {
        Map fields = new HashMap();
        for (Enumeration params = request.getParameterNames(); params.hasMoreElements();) {
            String fieldName = null;
            String fieldValue = null;
            try {
                fieldName = URLEncoder.encode((String) params.nextElement(), StandardCharsets.US_ASCII.toString());
                fieldValue = URLEncoder.encode(request.getParameter(fieldName), StandardCharsets.US_ASCII.toString());
            } catch (UnsupportedEncodingException e) {
                e.printStackTrace();
            }
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                fields.put(fieldName, fieldValue);
            }
        }

        String vnp_SecureHash = request.getParameter("vnp_SecureHash");
        if (fields.containsKey("vnp_SecureHashType")) {
            fields.remove("vnp_SecureHashType");
        }
        if (fields.containsKey("vnp_SecureHash")) {
            fields.remove("vnp_SecureHash");
        }
        String signValue = VNPayConfig.hashAllFields(fields);
        if (signValue.equals(vnp_SecureHash)) {
            if ("00".equals(request.getParameter("vnp_TransactionStatus"))) {
                String orderInfo = request.getParameter("vnp_OrderInfo");
                ObjectMapper objectMapper = new ObjectMapper();
                OrderInfo objOrderInfo = objectMapper.readValue(orderInfo, OrderInfo.class);
                enrollStudents(EnrollStudentDto.builder().courseIds(objOrderInfo.getCourseIds()).build(), objOrderInfo.getUserId());
                return 1;
            } else {
                return 0;
            }
        } else {
            return -1;
        }
    }
}

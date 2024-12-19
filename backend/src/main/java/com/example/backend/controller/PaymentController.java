package com.example.backend.controller;

import com.example.backend.dto.EnrollStudentDto;
import com.example.backend.entity.User;
import com.example.backend.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RequestMapping("/payments")
@RestController
@CrossOrigin("*")
public class PaymentController {
    private final PaymentService _paymentService;

    public PaymentController(PaymentService paymentService) {
        this._paymentService = paymentService;
    }

    @PostMapping("/enroll")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<String> enrollStudent(@RequestBody EnrollStudentDto enrollStudentDto) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            String response = _paymentService.enrollStudents(enrollStudentDto, currentUser.getId());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/submit-order")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<String> submitOrder(@RequestBody EnrollStudentDto enrollStudentDto,
                              HttpServletRequest request){
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            User currentUser = (User) authentication.getPrincipal();
            String baseUrl = "https://ddlong07.id.vn";
            System.out.println(baseUrl);
            String vnpayUrl = _paymentService.createOrder(request, enrollStudentDto, currentUser.getId(), baseUrl);
            return ResponseEntity.ok(vnpayUrl);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/vnpay-payment-return")
    public RedirectView paymentCompleted(HttpServletRequest request){
        RedirectView redirectView = new RedirectView();
        try {
            int paymentStatus = _paymentService.orderReturn(request);
            if(paymentStatus == 1) {
                redirectView.setUrl("https://edtech-hust.web.app/dashboard/enrolled-courses?status=success");
            }else {
                redirectView.setUrl("https://edtech-hust.web.app/dashboard/enrolled-courses?status=failed");
            }
        } catch (Exception e) {
            redirectView.setUrl("https://edtech-hust.web.app/dashboard/enrolled-courses?status=failed");
        }
        return redirectView;
    }
}

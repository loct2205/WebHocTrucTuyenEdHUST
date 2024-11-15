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
            String baseUrl = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort();
            String vnpayUrl = _paymentService.createOrder(request, enrollStudentDto, currentUser.getId(), baseUrl);
            return ResponseEntity.ok("redirect:" + vnpayUrl);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/vnpay-payment-return")
    public ResponseEntity<String> paymentCompleted(HttpServletRequest request){
        try {
            int paymentStatus = _paymentService.orderReturn(request);
            return paymentStatus == 1 ? ResponseEntity.ok("Payment successful") : ResponseEntity.ok("Payment failed");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

package com.example.backend.controller;

import com.example.backend.model.MailRequest;
import com.example.backend.service.MailService;
import jakarta.mail.MessagingException;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/mails")
@RestController
@CrossOrigin("*")
public class MailController {
    private final MailService _mailService;

    public MailController(MailService mailService) {
        this._mailService = mailService;
    }

    @PostMapping
    public void sendMail(@RequestBody MailRequest request) throws MessagingException {
        _mailService.sendMail(request);
    }
}

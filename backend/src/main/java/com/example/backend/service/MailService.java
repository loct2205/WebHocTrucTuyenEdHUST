package com.example.backend.service;

import com.example.backend.model.MailRequest;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private final JavaMailSender _mailSender;

    @Value("${spring.mail.username}")
    private String fromMail;

    public MailService(JavaMailSender mailSender) {
        this._mailSender = mailSender;
    }

    @Async
    public void sendMail(MailRequest request) throws MessagingException {
        MimeMessage mimeMessage = _mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);

        mimeMessageHelper.setFrom(fromMail);
        mimeMessageHelper.setTo(request.getToEmail());
        mimeMessageHelper.setSubject(request.getSubject());

        mimeMessageHelper.setText(request.getMessage(), request.isHTML());

        _mailSender.send(mimeMessage);
    }
}

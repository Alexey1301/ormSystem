package com.reputation.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "password123";
        String hash = encoder.encode(password);
        
        System.out.println("Password: " + password);
        System.out.println("BCrypt Hash: " + hash);
        System.out.println();
        System.out.println("SQL Update:");
        System.out.println("UPDATE \"user\" SET password_hash = '" + hash + "' WHERE username IN ('admin', 'manager', 'moderator', 'specialist');");
    }
}














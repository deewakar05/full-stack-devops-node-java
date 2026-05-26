package com.devops.javaservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HealthController {

    @Autowired(required = false)
    private MongoTemplate mongoTemplate;

    @GetMapping("/health")
    public Map<String, Object> checkHealth() {
        Map<String, Object> response = new HashMap<>();
        response.put("service", "java-service");
        response.put("status", "UP");
        
        String dbStatus = "DISCONNECTED";
        if (mongoTemplate != null) {
            try {
                // Perform a lightweight database ping command
                mongoTemplate.executeCommand("{ping: 1}");
                dbStatus = "CONNECTED";
            } catch (Exception e) {
                dbStatus = "DISCONNECTED (" + e.getMessage() + ")";
            }
        }
        
        response.put("database", dbStatus);
        response.put("timestamp", Instant.now().toString());
        return response;
    }
}

package com.devops.javaservice;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
    // Exclude MongoDB auto-configuration during test execution to prevent test failures
    // in CI environments (like GitHub Actions) where a MongoDB service is not running on localhost.
    "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.data.mongo.MongoDataAutoConfiguration,org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration"
})
class JavaServiceApplicationTests {

    @Test
    void contextLoads() {
        // Assert that the application context successfully starts up
    }
}

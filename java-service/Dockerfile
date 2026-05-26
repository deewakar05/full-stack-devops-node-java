# ==========================================
# Stage 1: Compilation & Packaging
# ==========================================
FROM maven:3.9.6-eclipse-temurin-17-alpine AS builder

WORKDIR /build

# Copy Maven POM to cache dependencies
COPY pom.xml .

# Download dependencies (improves caching speed on consecutive builds)
RUN mvn dependency:go-offline -B

# Copy remaining source code
COPY src ./src

# Compile and package application (skipping unit tests as they run in the CI/CD pipeline)
RUN mvn clean package -DskipTests -B

# ==========================================
# Stage 2: Optimized Runtime Environment
# ==========================================
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy packaged jar from builder stage
COPY --from=builder /build/target/*.jar app.jar

# Expose internal port
EXPOSE 8080

# Configure JVM properties for containerized workloads
ENV JAVA_OPTS="-XX:+UseG1GC -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom"

# Set up non-root system user for security hardening
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Start application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

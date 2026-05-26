# ==========================================
# Stage 1: Compilation & Packaging
# ==========================================
FROM maven:3.9.6-eclipse-temurin-17 AS builder

WORKDIR /build

# Copy Maven POM to cache dependencies first (layer caching optimisation)
COPY pom.xml .

# Download dependencies (improves caching speed on consecutive builds; fallback to package step if failing)
RUN mvn dependency:go-offline -B || true

# Copy remaining source code
COPY src ./src

# Compile and package application (tests run in CI/CD pipeline)
RUN mvn clean package -DskipTests -B

# ==========================================
# Stage 2: Optimised Runtime Environment
# ==========================================
FROM eclipse-temurin:17-jre

WORKDIR /app

# Copy packaged jar from builder stage
COPY --from=builder /build/target/*.jar app.jar

# Expose internal port
EXPOSE 8080

# Configure JVM for containerised workloads
ENV JAVA_OPTS="-XX:+UseG1GC -XX:MaxRAMPercentage=75.0 -Djava.security.egd=file:/dev/./urandom"

# Set up non-root system user for security hardening
RUN groupadd -r spring && useradd -r -g spring spring
USER spring:spring

# Start application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]

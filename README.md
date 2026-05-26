# 🚀 Full Stack DevOps Node + Java Microservices Platform

[![DevOps Pipeline](https://github.com/deewakar05/full-stack-devops-node-java/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/deewakar05/full-stack-devops-node-java/actions/workflows/ci-cd.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Docker Support](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker)](https://www.docker.com/)
[![React](https://img.shields.io/badge/Frontend-React%2018-blue?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend%201-Node%20Express-green?logo=nodedotjs)](https://nodejs.org/)
[![Spring Boot](https://img.shields.io/badge/Backend%202-Spring%20Boot%203-red?logo=springboot)](https://spring.io/projects/spring-boot)
[![Prometheus](https://img.shields.io/badge/Observability-Prometheus-orange?logo=prometheus)](https://prometheus.io/)
[![Grafana](https://img.shields.io/badge/Telemetry-Grafana-orange?logo=grafana)](https://grafana.com/)

A production-ready, multi-language, fully containerised microservices architecture designed to showcase modern enterprise DevOps, containerisation, path-based reverse proxy ingress routing, automated CI/CD validation pipelines, and end-to-end real-time system observability.

---

## 💎 Key Highlights

* **Production-Grade Microservices**: Built a modular, full-stack microservices platform using React (Vite), Node.js (Express), Java (Spring Boot 3), and MongoDB.
* **Unified Ingress Gateway**: Configured Nginx to act as a path-based reverse proxy, natively resolving Cross-Origin Resource Sharing (CORS) and normalising headers.
* **Multi-Container Orchestration**: Containerised 7 independent workloads using Docker and Docker Compose on a secure virtual bridge network.
* **Robust Observability**: Fully integrated Prometheus metric scraping and a pre-configured Grafana telemetry dashboard for real-time JVM, Node, and database metrics.
* **Automated CI/CD Pipeline**: Designed a GitHub Actions pipeline validating linting, running Jest/JUnit tests, verifying docker-compose syntax, and checking container builds.
* **Resilient Startup Workflows**: Implemented database connection retry wrapper logic in backends to prevent container startup crashes.

---

## 🏛️ System Architecture

This project orchestrates seven distinct workloads on a secure virtual bridge network. Nginx serves as the unified ingress gateway at port `80`, intercepting client calls and routing them to respective sub-networks while normalizing headers and natively resolving Cross-Origin Resource Sharing (CORS) constraints.

### Network Topology Diagram

```
                              ┌───────────────────────────┐
                              │    User Web Browser       │
                              └─────────────┬─────────────┘
                                            │ HTTP (Port 80 Ingress)
                                            ▼
                              ┌───────────────────────────┐
                              │   Nginx Ingress Gateway   │
                              └─┬───────────┬───────────┬─┘
                                │ /         │ /node/    │ /java/
                                ▼           ▼           ▼
              ┌───────────────────┐ ┌───────────┐ ┌─────────────┐
              │  React Frontend   │ │NodeExpress│ │ Spring Boot │
              │ Static Web Server │ │   API     │ │     API     │
              └───────────────────┘ └─────┬─────┘ └──────┬──────┘
                                          │              │
                                          ▼              ▼
                                    ┌───────────────────────────┐
                                    │      MongoDB Database     │
                                    └───────────────────────────┘
                                                 
   ──────────────────────── Observability Scrape Pull Loop ────────────────────────
   
   ┌──────────────┐         scrapes      ┌───────────────┐
   │ Grafana 3001 ├───────► Prometheus ◄─┼─ /metrics     │ (Node Express runtime)
   └──────────────┘         scrapes      └───────────────┘
                            Prometheus ◄─┼─ /prometheus  │ (Spring JVM Actuator)
                                         └───────────────┘
```

* **Web UI Ingress (`/`)**: Served by an internal lightweight Nginx container hosting optimized production React static assets.
* **Node Ingress (`/node/*`)**: Proxy-passed directly to the Node.js Express service (`port 3000`), stripping path prefixes.
* **Java Ingress (`/java/*`)**: Proxy-passed directly to the Java Spring Boot service (`port 8080`), stripping path prefixes.
* **Database Layer**: MongoDB acts as the centralized NoSQL database. Backends handle connection delays gracefully with retry loops.
* **Observability Pipeline**: Prometheus scrapes telemetry targets from backends every 5 seconds. Grafana displays these statistics automatically upon boot.

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js (v18) + Vite | Lightweight SPA, fast bundling, and modern UI capabilities |
| **Backend 1** | Node.js (v18) + Express | High-concurrency API service, CORS, Prom-Client telemetry |
| **Backend 2** | Java Spring Boot (v3) | Strong type safety, MVC controller patterns, Actuator metrics |
| **Database** | MongoDB (v6) | High performance NoSQL storage layer |
| **Ingress Gateway** | Nginx (v1.25) | Ingress reverse-proxy router, request headers normalizer |
| **Containerization** | Docker / Docker Compose | Service isolation, repeatable multi-container deployments |
| **CI/CD Automation** | GitHub Actions | Automated checkout, linting, Jest/JUnit testing, and Compose validation |
| **Observability** | Prometheus + Grafana | Unified metrics collector and visual monitoring dashboard |

---

## ✨ Features

* **Glassmorphic Interactive Dashboard**: A polished dark-mode console built using HSL color tokens, typography fonts (`Outfit`, `Inter`), and Lucide icons.
* **Real-time Latency Tickers**: Dynamically monitors API speeds and response payloads with a live request log audit feed.
* **Resilient Startup Sequences**: Services feature smart retry wrappers when connecting to MongoDB, preventing container bootstrap crashes.
* **Actuator and JVM Telemetry**: Exposes memory heaps, garbage collection, and CPU parameters from Spring Boot using Micrometer.
* **Zero-Configuration Observability**: Grafana is fully provisioned to boot with pre-loaded datasources and ready-to-use system health charts.
* **Offline Maven Testing**: JUnit tests exclude database auto-configurations, allowing successful compilation within headless CI environments.

---

## 📂 Folder Structure

```bash
full-stack-devops-node-java/
├── LICENSE                         # MIT Open Source License
├── README.md                       # Comprehensive DevOps Portfolio Documentation
├── docker-compose.yml              # Central multi-container orchestration manifest
├── .env.example                    # Template parameters layout
├── .env                            # Active environment configuration parameters
├── .github/
│   └── workflows/
│       └── ci-cd.yml               # GitHub Actions automated validation workflow
├── nginx/
│   └── default.conf                # API Gateway reverse-proxy mappings
├── frontend/                       # React.js Vite Client
│   ├── src/                        # React source files (App.jsx, index.css)
│   ├── index.html                  # SEO head page template
│   ├── nginx.conf                  # Nginx rules serving static bundles
│   ├── Dockerfile                  # Multi-stage production build container
│   └── package.json                # Frontend NPM packages list
├── node-service/                   # Node Express API
│   ├── src/
│   │   └── server.js               # Express application server and Prometheus targets
│   ├── tests/
│   │   └── health.test.js          # Automated endpoints Jest test suite
│   ├── Dockerfile                  # Lightweight production runtime container
│   └── package.json                # Node NPM packages list
├── java-service/                   # Java Spring Boot API
│   ├── pom.xml                     # Maven build specifications and dependencies
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/devops/javaservice/
│   │   │   │   ├── JavaServiceApplication.java      # Application entrypoint
│   │   │   │   └── controller/
│   │   │   │       └── HealthController.java        # Rest Endpoint controller
│   │   │   └── resources/
│   │   │       └── application.properties           # Server & Actuator config
│   │   └── test/
│   │       └── java/com/devops/javaservice/
│   │           └── JavaServiceApplicationTests.java # Mocked context JUnit test
│   └── Dockerfile                  # Multi-stage Java compile and packaging
└── monitoring/                     # Observability Suite
    ├── prometheus/
    │   └── prometheus.yml            # Telemetry scraping intervals and tasks
    └── grafana/
        ├── Dockerfile                # Grafana container pre-loaded with configurations
        └── provisioning/             # Auto-provisioned datasource & dashboard connectors
```

---

## 📸 Screenshots

### React Frontend Ingress Dashboard
> _Place a screenshot here showing the glassmorphic dark-mode interface, successful service health queries, latency metrics, and database status indicators._
> 
> ![Dashboard UI Mockup](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=600)

### Grafana Microservices Observability Console
> _Place a screenshot here illustrating real-time charts mapping CPU ratios, JVM memory limits, and HTTP request rate graphs._
> 
> ![Grafana UI Mockup](https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200&h=600)

### Prometheus Targets
> _Place a screenshot here displaying the active scraped microservices targets in UP state._

---

## 🚀 Local Setup & Installation

Get the entire stack up and running on your local development machine with these quick steps:

### Prerequisites
Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) (which includes Docker Compose) installed.

### Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/deewakar05/full-stack-devops-node-java.git
   cd full-stack-devops-node-java
   ```

2. **Configure Environment Variables**:
   Copy the example environment parameters layout:
   ```bash
   cp .env.example .env
   ```

3. **Orchestrate Container Clusters**:
   Build the multi-container images and run the services in the background:
   ```bash
   docker compose up --build -d
   ```

4. **Verify Container Health**:
   ```bash
   docker compose ps
   ```

---

## 🎛️ Docker Commands Reference

Use these commands to easily manage your microservices container cluster:

* **Stop the Cluster**:
  ```bash
  docker compose down
  ```
* **Tear Down Everything (including persistent volumes)**:
  ```bash
  docker compose down -v
  ```
* **View Integrated Logs**:
  ```bash
  docker compose logs -f
  ```
* **View Single Service Logs**:
  ```bash
  docker compose logs -f node-service
  docker compose logs -f java-service
  ```
* **Rebuild a Specific Microservice**:
  ```bash
  docker compose up -d --no-deps --build node-service
  ```

---

## 📈 Monitoring & Observability Integration

Prometheus and Grafana require zero manual configuration on startup.

* **Prometheus Targets Panel**:
  * URL: [http://localhost:9090/targets](http://localhost:9090/targets)
  * Verify that both `node-service` and `java-service` jobs report **UP**.
* **Grafana Dashboard Control Center**:
  * URL: [http://localhost:3001](http://localhost:3001)
  * Default Credentials: `admin` / `admin`
  * **View Preconfigured Metrics**: Click **Dashboards** in the left sidebar, and select **DevOps Microservices Telemetry Control Center** to monitor request rates, JVM memory limits, and backend health in real time.

---

## 🛠️ Troubleshooting

#### 1. Database status displays "DISCONNECTED" on Dashboard
* **Cause**: MongoDB takes ~10 seconds to configure security credentials and report healthy. The backend services start instantly, but connect once the DB is ready.
* **Resolution**: Wait 15 seconds, and then click **Test API** on the React UI. The status will automatically switch to **CONNECTED**.

#### 2. Service container exits on startup due to Port Conflict
* **Cause**: Your local machine already has a process running on one of the host ports (e.g. `80`, `3000`, `3001`, `8080`, `27017`).
* **Resolution**: Open your `.env` file, edit the conflicting port variable (e.g. change `NGINX_PORT=80` to `NGINX_PORT=8082`), and rebuild:
  ```bash
  docker compose up -d --build
  ```

#### 3. Spring Boot maven packaging fails in local development
* **Cause**: Incorrect Java SDK configured.
* **Resolution**: Ensure you have JDK 17 active in your terminal environment:
  ```bash
  java -version
  ```

---

## 🔮 Continuous Integration Pipeline (CI/CD)

The automated integration workflow is located in [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml).

### Automated Pipeline Flow
Every `push` or `pull request` to the `main` branch triggers the following steps on an Ubuntu runner:
1. **Checkout**: Pulls the code from your repository.
2. **Node.js Environment**: Sets up Node.js v18 and enables npm cache sharing.
3. **Frontend Compilation**: Installs dependencies and runs `npm run build` to verify React compilation.
4. **Node.js Automated Test**: Triggers the Jest unit test suite (`npm test`) on the Express API.
5. **Java JDK Setup**: Configures JDK 17 (Temurin) and enables Maven dependency caching.
6. **Java Automated Build**: Compiles Spring Boot source files, executes JUnit tests, and packages the final JAR.
7. **Compose Validation**: Audits the syntactical structure of `docker-compose.yml` (`docker compose config`).
8. **Docker Builds Check**: Manually compiles individual Dockerfiles (`frontend`, `node-service`, `java-service`) inside the runner to confirm the stability of each build layer.

---

## 🚀 Git Commands for Uploading to GitHub

To push your production-ready project to your own GitHub repository:

```bash
# 1. Initialize local repository
git init

# 2. Add all clean source files
git add .

# 3. Commit with professional descriptive message
git commit -m "Final production-ready full stack DevOps microservices project"

# 4. Set primary branch to main
git branch -M main

# 5. Connect your remote repository
git remote add origin <YOUR_GITHUB_REPO_URL>

# 6. Push to GitHub
git push -u origin main
```

---

## 🔮 Future Architecture Roadmap

Consider the following production-grade enhancements to scale this platform:
1. **Kubernetes (K8s) Migration**: Translate Docker Compose services to K8s manifests, utilising Horizontal Pod Autoscalers (HPAs) and Helm charts.
2. **Secret Management**: Inject database credentials using HashiCorp Vault or AWS Secrets Manager rather than plaintext environmental values.
3. **Distributed Tracing**: Integrate Jaeger or Zipkin into backends alongside Prometheus to monitor request traces across network services.
4. **Security Vulnerability Scanning**: Integrate Trivy or Snyk steps into the GitHub Actions pipeline to scan dependencies and Docker layers.

# 🚀 Enterprise DevOps Control Center & Microservices Ingress Cluster

[![DevOps Pipeline](https://github.com/deewakar05/CI-CD-Pipeline-for-a-Dockerized-Application/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/deewakar05/CI-CD-Pipeline-for-a-Dockerized-Application/actions/workflows/ci-cd.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docker Support](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker)](https://www.docker.com/)
[![React](https://img.shields.io/badge/Frontend-React%2018-blue?logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend%201-Node%20Express-green?logo=nodedotjs)](https://nodejs.org/)
[![Spring Boot](https://img.shields.io/badge/Backend%202-Spring%20Boot%203-red?logo=springboot)](https://spring.io/projects/spring-boot)
[![Prometheus](https://img.shields.io/badge/Observability-Prometheus-orange?logo=prometheus)](https://prometheus.io/)
[![Grafana](https://img.shields.io/badge/Telemetry-Grafana-orange?logo=grafana)](https://grafana.com/)

A production-ready, multi-language, fully containerized microservices architecture designed to showcase modern enterprise DevOps, containerization, path-based reverse proxy ingress routing, automated CI/CD validation pipelines, and end-to-end real-time system observability.

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

### Flow Validation
* **Web UI Ingress (`/`)**: Served by an internal lightweight Nginx container hosting optimized production React static assets.
* **Node Ingress (`/node/*`)**: Proxy-passed directly to the Node.js Express service (`port 3000`), stripping path prefixes.
* **Java Ingress (`/java/*`)**: Proxy-passed directly to the Java Spring Boot service (`port 8080`), stripping path prefixes.
* **Database Layer**: MongoDB acts as the centralized data vault. Backends handle initial database connection delays gracefully using automated reconnection loops.
* **Observability Pipeline**: Prometheus scrapes telemetry targets, pulling runtime data (JVM performance, Express endpoints latency) every 5 seconds. Grafana displays these statistics automatically upon boot.

---

## 🛠️ Technology Stack

| Domain | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | **React.js (v18) + Vite** | Lightweight SPA, fast bundling, and modern UI capabilities |
| **Backend 1** | **Node.js + Express** | High-concurrency API service, CORS, Prom-Client telemetry |
| **Backend 2** | **Java Spring Boot (v3)** | Strong type safety, MVC controller patterns, Actuator metrics |
| **Database** | **MongoDB (v6)** | High performance NoSQL storage layer |
| **Ingress Gateway**| **Nginx (v1.25)** | Ingress reverse-proxy router, request headers normalizer |
| **Containerization**| **Docker + Docker Compose**| Service isolation, repeatable multi-container deployments |
| **CI/CD Automation**| **GitHub Actions** | Automated checkout, build auditing, Jest/JUnit testing, and Compose syntax validation |
| **Observability** | **Prometheus + Grafana** | Unified metrics collector and visual monitoring dashboard |

---

## ✨ Features

* **Glassmorphic Interactive Dashboard**: A polished dark-mode console built using HSL color tokens, typography fonts (`Outfit`, `Inter`), and Lucide icons.
* **Real-time Latency Tickers**: Dynamically monitors API speeds and response payloads with a live request log audit feed.
* **Resilient Startup Sequences**: Services feature smart retry wrappers when connecting to MongoDB, preventing container bootstrap crashes.
* **Actuator and JVM Telemetry**: Exposes memory heaps, garbage collection, and CPU parameters from Spring Boot using Micrometer.
* **Zero-Configuration Observability**: Grafana is fully provisioned to boot with pre-loaded datasources and ready-to-use system health charts.
* **Offline Maven Testing**: JUnit tests exclude database auto-configurations, allowing successful compilation within headless CI environments.

---

## 📂 Repository Structure

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
│   ├── package.json                # Frontend NPM packages list
│   └── package-lock.json           # Locked dependencies layout
├── node-service/                   # Node Express API
│   ├── src/
│   │   └── server.js               # Express application server and Prometheus targets
│   ├── tests/
│   │   └── health.test.js          # Automated endpoints Jest test suite
│   ├── Dockerfile                  # Lightweight production runtime container
│   ├── package.json                # Node NPM packages list
│   └── package-lock.json           # Locked dependencies layout
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
        └── provisioning/
            ├── datasources/
            │   └── datasource.yml    # Auto-provisioned Prometheus connector
            └── dashboards/
                ├── dashboards.yml    # Provider folders mapping
                └── dashboard.json    # Complete JSON Dashboard configuration
```

---

## 📸 Screenshots Section Placeholders

*Include high-quality screenshots in this section to make your GitHub portfolio stand out!*

#### 1. React Frontend Ingress Dashboard
> _Place a screenshot here showing the glassmorphic dark-mode interface, successful service health queries, latency metrics, and database status indicators._
> 
> ![Dashboard UI Mockup](https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=600)

#### 2. Grafana Microservices Observability Console
> _Place a screenshot here illustrating real-time charts mapping CPU ratios, JVM memory limits, and HTTP request rate graphs._
> 
> ![Grafana UI Mockup](https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200&h=600)

---

## 🚀 Local Installation & Execution

To deploy and execute the complete stack on your development machine, follow the instructions below:

### Prerequisites

Ensure you have the following software installed:
* [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose)
* [Node.js v18+](https://nodejs.org/) (Optional, for direct development)
* [Java JDK 17+](https://adoptium.net/) (Optional, for local Maven executions)

### Step-by-Step Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. **Configure Environment Variables**:
   Instantiate the environment variables from the template structure:
   ```bash
   cp .env.example .env
   ```
   *(The `.env` file contains pre-defined host ports and database credentials. Modify them as needed.)*

3. **Orchestrate Container Clusters**:
   Build all images and spin up the complete 7-container cluster in the background:
   ```bash
   docker compose up --build -d
   ```

4. **Verify Container Health**:
   Wait a few seconds for the MongoDB container database check to complete, then view the status:
   ```bash
   docker compose ps
   ```

---

## 🎛️ Docker Commands Reference

Manage your microservices cluster using these Docker utility commands:

* **Stop the Cluster** (preserves volume database data):
  ```bash
  docker compose down
  ```
* **Tear Down Everything** (removes networks, containers, and data volumes):
  ```bash
  docker compose down -v
  ```
* **View Aggregated Real-time Logs**:
  ```bash
  docker compose logs -f
  ```
* **View Single Microservice Logs**:
  ```bash
  docker compose logs -f node-service
  docker compose logs -f java-service
  ```
* **Recompile a Single Service**:
  ```bash
  docker compose up -d --no-deps --build node-service
  ```

---

## 📈 Monitoring & Observability Integration

Prometheus and Grafana require zero manual configuration on startup.

* **Prometheus Targets Panel**:
  * URL: [http://localhost:9090/targets](http://localhost:9090/targets)
  * Verify that `node-service` and `java-service` jobs both report **UP**.
* **Grafana Visualization Panel**:
  * URL: [http://localhost:3001](http://localhost:3001)
  * Default Credentials:
    * **Username**: `admin`
    * **Password**: `admin`
  * Pre-loaded Telemetry Dashboard: Click on "Dashboards" inside the sidebar menu, then select **DevOps Microservices Telemetry Control Center** to view JVM metrics, CPU load, and request rates in real time.

---

## 🛠️ Comprehensive Troubleshooting

#### 1. The database status displays "DISCONNECTED" on the Dashboard
* **Cause**: MongoDB takes ~10s to complete its initial security audits and pass container health checks. The backend services start instantly, but the database connection is established after MongoDB reports `healthy`.
* **Resolution**: Wait 15 seconds, and then click **Test API** on the React UI. The status will automatically switch to **CONNECTED**.

#### 2. Service container exits on startup due to Port Conflict
* **Cause**: Your host machine already has a process running on port `80`, `3000`, `3001`, `8080`, or `27017`.
* **Resolution**: Open your `.env` file, modify the conflicting port mappings (e.g., change `NGINX_PORT=80` to `NGINX_PORT=8081`), and re-run:
  ```bash
  docker compose up -d --build
  ```

#### 3. Spring Boot maven packaging fails in local development
* **Cause**: Missing Java JDK 17 environment variables.
* **Resolution**: Make sure JDK 17 is active in your terminal environment. You can check your version using:
  ```bash
  java -version
  ```

---

## 🔮 Continuous Integration Pipeline (CI/CD)

The automated integration workflow is located in `.github/workflows/ci-cd.yml`.

### Automated Pipeline Flow
Every `push` or `pull request` to the `main` branch triggers the following steps on an Ubuntu container runner:
1. **Checkout**: Pulls the code from your repository.
2. **Node.js Bootstrapper**: Configures Node.js v18 and caches dependency registries to speed up subsequent executions.
3. **Frontend Compilation**: Installs dependencies and runs `npm run build` to verify React compilation.
4. **Node.js Automated Test**: Triggers the Jest unit test suite (`npm test`) on the Express API.
5. **Java JDK Setup**: Configures JDK 17 (Temurin) and enables Maven dependency caching.
6. **Java Automated Build**: Compiles Spring Boot source files, executes the mock JUnit tests, and packages the final jar (`mvn clean package`).
7. **Compose Validation**: Audits the syntactical structure of `docker-compose.yml` (`docker compose config`).
8. **Docker Builds Check**: Manually compiles individual Dockerfiles (`frontend`, `node-service`, `java-service`) inside the runner to confirm the stability of each build layer.

---

## 🚀 Git Commands for Uploading to GitHub

Follow these steps to initialize and push your production-ready project to your GitHub repository:

```bash
# 1. Initialize local repository
git init

# 2. Add all clean source files
git add .

# 3. Commit with professional descriptive message
git commit -m "feat: Initial production-ready full stack DevOps microservices cluster"

# 4. Set primary branch to main
git branch -M main

# 5. Connect your remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 6. Push to GitHub
git push -u origin main
```

---

## 🔮 Future Architecture Roadmap

To scale this system for large-scale enterprise production, consider the following enhancements:
1. **Orchestrate with Kubernetes (K8s)**: Migrate Docker Compose to Kubernetes manifests, incorporating horizontal pod autoscalers (HPA) and Helm charts.
2. **Implement Secret Managers**: Inject sensitive database credentials via HashiCorp Vault or AWS Secrets Manager instead of `.env` configurations.
3. **Add Distributed Tracing**: Wire Jaeger or Zipkin into backends alongside Prometheus to enable complete trace spans across microservice networks.
4. **Integrate Security Scans**: Incorporate Trivy or Snyk steps into the GitHub Actions pipeline to audit packages and Docker layers for vulnerabilities.

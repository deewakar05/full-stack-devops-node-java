# 🚀 Full Stack DevOps Node + Java Microservices Platform

[![CI/CD Pipeline](https://github.com/deewakar05/full-stack-devops-node-java/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/deewakar05/full-stack-devops-node-java/actions/workflows/ci-cd.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Docker Support](https://img.shields.io/badge/Docker-Enabled-blue?logo=docker&logoColor=white)](https://www.docker.com/)
[![React](https://img.shields.io/badge/Frontend-React%2018-blue?logo=react&logoColor=white)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Backend%201-Node%20Express-green?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Spring Boot](https://img.shields.io/badge/Backend%202-Spring%20Boot%203-red?logo=springboot&logoColor=white)](https://spring.io/projects/spring-boot)
[![Prometheus](https://img.shields.io/badge/Observability-Prometheus-orange?logo=prometheus&logoColor=white)](https://prometheus.io/)
[![Grafana](https://img.shields.io/badge/Telemetry-Grafana-orange?logo=grafana&logoColor=white)](https://grafana.com/)

A production-ready, multi-language microservices architecture engineered to showcase modern enterprise DevOps, containerization, path-based reverse proxy ingress routing, automated CI/CD validation pipelines, and end-to-end real-time system observability.

---

## 💎 Key Highlights

* **Full-Stack Platform**: Built a modular full-stack platform using React (Vite), Node.js (Express), Java (Spring Boot 3), and MongoDB.
* **Orchestration**: Containerized and orchestrated **7 independent workloads** using Docker and Docker Compose on a secure virtual bridge network.
* **Reverse Proxy Ingress**: Configured Nginx to act as a path-based reverse proxy gateway, natively resolving CORS and normalizing headers.
* **CI/CD Automation**: Designed an automated integration pipeline using GitHub Actions to validate syntax, run Jest/JUnit tests, and verify container builds.
* **Unified Observability**: Pre-provisioned Prometheus metric scraping and custom Grafana telemetry dashboards to monitor JVM, Node, and database health.
* **Observability Console**: Designed a responsive, glassmorphic developer dashboard for live service and query status metrics.

---

## 🏛️ System Architecture

This platform orchestrates seven distinct workloads within a secure virtual bridge network. Nginx serves as the unified ingress gateway at port `80`, intercepting client calls and routing them to respective services while shielding internal network topologies.

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

## 🛠️ Tech Stack

| Domain | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend** | React.js + Vite | v18.x | Lightweight SPA with high performance and modular component design |
| **Backend 1** | Node.js + Express | v18.x | High-concurrency API service, CORS config, and Prom-Client telemetry |
| **Backend 2** | Java Spring Boot | v3.x | Strong type safety, REST API endpoints, and Actuator metrics |
| **Database** | MongoDB | v6.x | High performance NoSQL storage layer |
| **Proxy / Ingress** | Nginx | v1.25 | Ingress reverse-proxy router and request header normalizer |
| **Observability** | Prometheus & Grafana | Latest | Automated metric scraping and telemetry visualization panels |
| **CI/CD Automation** | GitHub Actions | - | Automated validation: linting, tests, Compose, and Docker builds |

---

## ✨ Features

* **Glassmorphic Developer Dashboard**: Polished dark-mode console built using HSL color tokens, typography fonts (`Outfit`, `Inter`), and Lucide icons.
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
├── README.md                       # Developer Portfolio Documentation
├── docker-compose.yml              # Central multi-container orchestration manifest
├── .env.example                    # Template parameters layout
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
    │   └── prometheus.yml          # Telemetry scraping intervals and tasks
    └── grafana/
        ├── Dockerfile              # Grafana container pre-loaded with configurations
        └── provisioning/           # Auto-provisioned datasource & dashboard connectors
```

---

## 📸 Screenshots

### Dashboard
Add screenshot here

### Grafana Dashboard
Add screenshot here

### Prometheus Targets
Add screenshot here

---

## 🚀 Local Setup & Installation

Get the entire stack up and running on your local development machine with these quick steps:

### Prerequisites

Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) (which includes Docker Compose) installed.

### Setup Instructions

```bash
# 1. Clone the Repository
git clone <repo-url>
cd <repo-name>

# 2. Configure Environment Variables
cp .env.example .env

# 3. Orchestrate Container Clusters
docker compose up --build -d
```

Verify container health by running:
```bash
docker compose ps
```

---

## 🎛️ Docker Commands Reference

Use these commands to easily manage your microservices container cluster:

| Command | Action |
| :--- | :--- |
| `docker compose up -d` | Start services in background |
| `docker compose up --build -d` | Rebuild and start all services |
| `docker compose down` | Stop the container cluster |
| `docker compose down -v` | Tear down containers and wipe persistent database volumes |
| `docker compose logs -f` | View integrated logs across all services |
| `docker compose logs -f <service>` | View logs for a single service (e.g. `node-service` or `java-service`) |
| `docker compose up -d --no-deps --build <service>` | Rebuild and restart a specific microservice |

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

## 🔮 CI/CD Pipeline

The automated integration workflow is located in [`.github/workflows/ci-cd.yml`](.github/workflows/ci-cd.yml) and triggers on every `push` or `pull request` to the `main` branch.

### Automated Pipeline Flow

1. **Checkout**: Pulls the code from your repository.
2. **Node.js Environment**: Sets up Node.js v18 and enables npm cache sharing.
3. **Frontend Compilation**: Installs dependencies and runs `npm run build` to verify React compilation.
4. **Node.js Automated Test**: Triggers the Jest unit test suite (`npm test`) on the Express API.
5. **Java JDK Setup**: Configures JDK 17 (Temurin) and enables Maven dependency caching.
6. **Java Automated Build**: Compiles Spring Boot source files, executes JUnit tests, and packages the final JAR.
7. **Compose Validation**: Audits the syntactical structure of `docker-compose.yml` (`docker compose config`).
8. **Docker Builds Check**: Manually compiles individual Dockerfiles (`frontend`, `node-service`, `java-service`) inside the runner to confirm the stability of each build layer.

---

## 🛠️ Troubleshooting

#### 1. Database status displays "DISCONNECTED" on Dashboard
* **Cause**: MongoDB takes ~10 seconds to configure security credentials and report healthy. The backend services start instantly, but connect once the DB is ready.
* **Resolution**: Wait 15 seconds, and then click **Test API** on the React UI. The status will automatically switch to **CONNECTED** thanks to the integrated backend retry loops.

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

## 🚀 GitHub Push Commands

To push your production-ready project to your own GitHub repository:

```bash
# 1. Initialize local repository
git init

# 2. Add all clean source files
git add .

# 3. Commit with professional descriptive message
git commit -m "feat: production-ready full stack DevOps microservices platform"

# 4. Set primary branch to main
git branch -M main

# 5. Connect your remote repository
git remote add origin <YOUR_GITHUB_REPO_URL>

# 6. Push to GitHub
git push -u origin main
```

---

## 🔮 Future Improvements

Consider the following production-grade enhancements to scale this platform:

1. **Kubernetes (K8s) Migration**: Translate Docker Compose services to K8s manifests, utilizing Horizontal Pod Autoscalers (HPAs) and Helm charts.
2. **Secret Management**: Inject database credentials using HashiCorp Vault or AWS Secrets Manager rather than plaintext environmental values.
3. **Distributed Tracing**: Integrate Jaeger or Zipkin into backends alongside Prometheus to monitor request traces across network services.
4. **Security Vulnerability Scanning**: Integrate Trivy or Snyk steps into the GitHub Actions pipeline to scan dependencies and Docker layers.

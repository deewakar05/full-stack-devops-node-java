# Use official stable Grafana image
FROM grafana/grafana:10.4.2

# Configure environment settings to streamline development:
# 1. Set default admin password to 'admin' (can be changed in production)
# 2. Disable password reset prompts on initial login
# 3. Disable telemetry reporting
ENV GF_SECURITY_ADMIN_PASSWORD=admin
ENV GF_SECURITY_ADMIN_USER=admin
ENV GF_USERS_ALLOW_SIGN_UP=false
ENV GF_ANALYTICS_REPORTING_ENABLED=false

# Copy the provisioning data source and provider configurations
COPY provisioning/ /etc/grafana/provisioning/

# Copy the actual pre-configured dashboard JSON file into the provisioned directory
COPY provisioning/dashboards/dashboard.json /var/lib/grafana/dashboards/dashboard.json

# Expose internal port (which we map to 3001 in docker-compose)
EXPOSE 3000

import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Database, 
  Terminal as TerminalIcon, 
  Play, 
  RefreshCw, 
  Server, 
  Cpu, 
  Layers, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';

function App() {
  // Service Telemetry States
  const [nodeStatus, setNodeStatus] = useState('unknown'); // 'unknown', 'up', 'down'
  const [nodeResponse, setNodeResponse] = useState(null);
  const [nodeLatency, setNodeLatency] = useState(null);
  const [nodeLoading, setNodeLoading] = useState(false);

  const [javaStatus, setJavaStatus] = useState('unknown'); // 'unknown', 'up', 'down'
  const [javaResponse, setJavaResponse] = useState(null);
  const [javaLatency, setJavaLatency] = useState(null);
  const [javaLoading, setJavaLoading] = useState(false);

  const [requestHistory, setRequestHistory] = useState([]);

  // Database status dynamically computed from backend responses
  const getDatabaseStatus = () => {
    const nodeDb = nodeResponse?.database;
    const javaDb = javaResponse?.database;
    
    if (nodeDb?.includes('CONNECTED') || javaDb?.includes('CONNECTED')) {
      return 'CONNECTED';
    }
    if (nodeDb?.includes('DISCONNECTED') || javaDb?.includes('DISCONNECTED')) {
      return 'DISCONNECTED';
    }
    return 'UNKNOWN';
  };

  // Helper to add request into timeline logs
  const addToHistory = (service, method, url, status, duration) => {
    const newItem = {
      id: Date.now() + Math.random().toString(36).substr(2, 5),
      timestamp: new Date().toLocaleTimeString(),
      service,
      method,
      url,
      status,
      duration: `${duration}ms`
    };
    setRequestHistory(prev => [newItem, ...prev].slice(0, 10)); // Limit to last 10 requests
  };

  // Fetch Node Service Health
  const fetchNodeHealth = async () => {
    setNodeLoading(true);
    const start = performance.now();
    try {
      // Relative path routes directly through the primary Nginx proxy gateway
      const response = await fetch('/node/health', {
        headers: { 'Accept': 'application/json' }
      });
      const duration = Math.round(performance.now() - start);
      setNodeLatency(duration);

      if (response.ok) {
        const data = await response.json();
        setNodeResponse(data);
        setNodeStatus(data.status === 'UP' ? 'up' : 'down');
        addToHistory('Node.js', 'GET', '/node/health', response.status, duration);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (err) {
      const duration = Math.round(performance.now() - start);
      setNodeLatency(duration);
      setNodeStatus('down');
      setNodeResponse({
        error: "Failed to connect to Node.js Service.",
        details: err.message,
        timestamp: new Date().toISOString()
      });
      addToHistory('Node.js', 'GET', '/node/health', 'FAIL', duration);
    } finally {
      setNodeLoading(false);
    }
  };

  // Fetch Java Service Health
  const fetchJavaHealth = async () => {
    setJavaLoading(true);
    const start = performance.now();
    try {
      // Relative path routes directly through the primary Nginx proxy gateway
      const response = await fetch('/java/health', {
        headers: { 'Accept': 'application/json' }
      });
      const duration = Math.round(performance.now() - start);
      setJavaLatency(duration);

      if (response.ok) {
        const data = await response.json();
        setJavaResponse(data);
        setJavaStatus(data.status === 'UP' ? 'up' : 'down');
        addToHistory('Java Boot', 'GET', '/java/health', response.status, duration);
      } else {
        throw new Error(`HTTP Error ${response.status}`);
      }
    } catch (err) {
      const duration = Math.round(performance.now() - start);
      setJavaLatency(duration);
      setJavaStatus('down');
      setJavaResponse({
        error: "Failed to connect to Java Spring Boot Service.",
        details: err.message,
        timestamp: new Date().toISOString()
      });
      addToHistory('Java Boot', 'GET', '/java/health', 'FAIL', duration);
    } finally {
      setJavaLoading(false);
    }
  };

  const handleRefreshAll = () => {
    fetchNodeHealth();
    fetchJavaHealth();
  };

  // Run initial polling on component load
  useEffect(() => {
    handleRefreshAll();
    
    // Auto polling interval every 15 seconds to keep system health metrics updated
    const interval = setInterval(() => {
      fetchNodeHealth();
      fetchJavaHealth();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const dbStatus = getDatabaseStatus();

  return (
    <div className="app-container">
      
      {/* 1. Header Control bar */}
      <header className="glass-panel header-wrapper">
        <div className="title-container">
          <Layers className="logo-icon" size={32} />
          <div>
            <h1 className="title-primary">DevOps Ingress Dashboard</h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.125rem' }}>
              Multi-Language Containerized Cluster Overview
            </p>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span className="badge-tag">
            <span className="pulse-dot"></span>
            Live Monitoring
          </span>
          <button 
            className="glow-btn" 
            style={{ 
              backgroundImage: 'linear-gradient(135deg, hsl(217, 91%, 50%) 0%, hsl(200, 95%, 45%) 100%)',
              padding: '0.6rem 1.2rem',
              fontSize: '0.8125rem'
            }}
            onClick={handleRefreshAll}
          >
            <RefreshCw size={14} className={nodeLoading || javaLoading ? 'spin-anim' : ''} />
            Refresh Control Room
          </button>
        </div>
      </header>

      {/* 2. Top System Level Telemetry Row */}
      <section className="overview-grid">
        {/* Nginx Ingress Controller Card */}
        <div className="glass-panel metric-card">
          <div className="metric-info">
            <span className="metric-label">Ingress Proxy Gate</span>
            <span className="metric-value">Active</span>
            <span className="badge-tag" style={{ fontSize: '0.6875rem', padding: '0.15rem 0.5rem', marginTop: '0.25rem' }}>
              NGINX Port 80
            </span>
          </div>
          <div className="metric-icon-box" style={{ color: 'var(--color-accent)' }}>
            <Activity size={24} />
          </div>
        </div>

        {/* Database Status Card */}
        <div className="glass-panel metric-card">
          <div className="metric-info">
            <span className="metric-label">Shared Database</span>
            <span className="metric-value" style={{ 
              color: dbStatus === 'CONNECTED' ? 'var(--color-success)' : 
                     dbStatus === 'DISCONNECTED' ? 'var(--color-danger)' : 'var(--color-warning)'
            }}>
              {dbStatus}
            </span>
            <span className="badge-tag" style={{ fontSize: '0.6875rem', padding: '0.15rem 0.5rem', marginTop: '0.25rem' }}>
              MongoDB
            </span>
          </div>
          <div className="metric-icon-box" style={{ 
            color: dbStatus === 'CONNECTED' ? 'var(--color-success)' : 
                   dbStatus === 'DISCONNECTED' ? 'var(--color-danger)' : 'var(--color-warning)'
          }}>
            <Database size={24} />
          </div>
        </div>

        {/* Node.js Latency Indicator */}
        <div className="glass-panel metric-card">
          <div className="metric-info">
            <span className="metric-label">Node API Latency</span>
            <span className="metric-value">
              {nodeLatency !== null ? `${nodeLatency} ms` : '—'}
            </span>
            <span className="badge-tag" style={{ 
              fontSize: '0.6875rem', 
              padding: '0.15rem 0.5rem', 
              marginTop: '0.25rem',
              color: nodeStatus === 'up' ? 'var(--color-success)' : 'var(--color-danger)'
            }}>
              Express.js Svc
            </span>
          </div>
          <div className="metric-icon-box" style={{ color: 'var(--color-success)' }}>
            <Clock size={24} />
          </div>
        </div>

        {/* Java Latency Indicator */}
        <div className="glass-panel metric-card">
          <div className="metric-info">
            <span className="metric-label">Java API Latency</span>
            <span className="metric-value">
              {javaLatency !== null ? `${javaLatency} ms` : '—'}
            </span>
            <span className="badge-tag" style={{ 
              fontSize: '0.6875rem', 
              padding: '0.15rem 0.5rem', 
              marginTop: '0.25rem',
              color: javaStatus === 'up' ? 'var(--color-secondary)' : 'var(--color-danger)'
            }}>
              Spring Boot Svc
            </span>
          </div>
          <div className="metric-icon-box" style={{ color: 'var(--color-secondary)' }}>
            <Cpu size={24} />
          </div>
        </div>
      </section>

      {/* 3. Microservices Control Room (Node / Java) */}
      <section className="services-container">
        
        {/* Node.js microservice card */}
        <div className="glass-panel service-card">
          <div className="card-header">
            <div className="service-meta">
              <div className="service-logo-box node">
                <Server size={22} />
              </div>
              <div className="service-identity">
                <span className="service-name">Node.js Express API</span>
                <span className="service-endpoint">GET /node/health</span>
              </div>
            </div>
            <span className={`status-indicator ${nodeStatus}`}>
              {nodeStatus}
            </span>
          </div>

          <div className="card-body">
            <div className="action-row">
              <p className="description-text">
                Primary API integration microservice. Configured with Express middlewares, CORS logic, Morgan terminal request logs, and Prom-Client metrics.
              </p>
              <button 
                className="glow-btn node-btn" 
                onClick={fetchNodeHealth}
                disabled={nodeLoading}
              >
                {nodeLoading ? <RefreshCw size={14} className="spin-anim" /> : <Play size={14} />}
                Test API
              </button>
            </div>

            {/* JSON Response Terminal Console */}
            <div className="terminal-console">
              <div className="terminal-header">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TerminalIcon size={12} />
                  RESPONSE PAYLOAD
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {nodeLatency !== null && <span className="latency-badge">{nodeLatency}ms</span>}
                  <div className="console-actions">
                    <span className="dot-red"></span>
                    <span className="dot-yellow"></span>
                    <span className="dot-green"></span>
                  </div>
                </div>
              </div>
              <pre className="terminal-pre">
                {nodeResponse ? JSON.stringify(nodeResponse, null, 2) : '// No requests run yet. Click "Test API" above.'}
              </pre>
            </div>
          </div>
        </div>

        {/* Java Spring Boot microservice card */}
        <div className="glass-panel service-card">
          <div className="card-header">
            <div className="service-meta">
              <div className="service-logo-box java">
                <Cpu size={22} />
              </div>
              <div className="service-identity">
                <span className="service-name">Java Spring Boot API</span>
                <span className="service-endpoint">GET /java/health</span>
              </div>
            </div>
            <span className={`status-indicator ${javaStatus}`}>
              {javaStatus}
            </span>
          </div>

          <div className="card-body">
            <div className="action-row">
              <p className="description-text">
                Secondary high-performance service. Configured with standard Spring Boot Actuator health checks and Micrometer Prometheus scraping parameters.
              </p>
              <button 
                className="glow-btn java-btn" 
                onClick={fetchJavaHealth}
                disabled={javaLoading}
              >
                {javaLoading ? <RefreshCw size={14} className="spin-anim" /> : <Play size={14} />}
                Test API
              </button>
            </div>

            {/* JSON Response Terminal Console */}
            <div className="terminal-console">
              <div className="terminal-header">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <TerminalIcon size={12} />
                  RESPONSE PAYLOAD
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {javaLatency !== null && <span className="latency-badge">{javaLatency}ms</span>}
                  <div className="console-actions">
                    <span className="dot-red"></span>
                    <span className="dot-yellow"></span>
                    <span className="dot-green"></span>
                  </div>
                </div>
              </div>
              <pre className="terminal-pre">
                {javaResponse ? JSON.stringify(javaResponse, null, 2) : '// No requests run yet. Click "Test API" above.'}
              </pre>
            </div>
          </div>
        </div>

      </section>

      {/* 4. Live Gateway Request History Stream Log */}
      <section className="glass-panel" style={{ padding: '1.75rem 2rem' }}>
        <div className="history-section">
          <span className="history-title">Traffic Gateway Logging Stream (Reverse Proxy Audits)</span>
          <div className="history-list">
            {requestHistory.length > 0 ? (
              requestHistory.map((item) => (
                <div key={item.id} className="history-item">
                  <div className="history-left">
                    <span className="history-time">[{item.timestamp}]</span>
                    <span className="history-method">{item.method}</span>
                    <span className="history-path">{item.url}</span>
                    <span style={{ color: 'var(--text-muted)' }}>via</span>
                    <span style={{ 
                      color: item.service === 'Node.js' ? 'var(--color-success)' : 'var(--color-secondary)',
                      fontWeight: 600
                    }}>
                      {item.service}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ 
                      color: item.status === 200 ? 'var(--color-success)' : 'var(--color-danger)',
                      fontWeight: 700 
                    }}>
                      {item.status}
                    </span>
                    <span className="latency-badge">{item.duration}</span>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ 
                textAlign: 'center', 
                color: 'var(--text-muted)', 
                fontSize: '0.8125rem',
                padding: '1.5rem 0',
                fontFamily: 'var(--font-mono)'
              }}>
                // Awaiting inbound REST request logs...
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* CSS Animation Add-on inside Component */}
      <style>{`
        .spin-anim {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

    </div>
  );
}

export default App;

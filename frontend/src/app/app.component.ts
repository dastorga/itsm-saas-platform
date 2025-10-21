import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-container">
      <header class="header">
        <h1>🎯 ITSM SaaS Platform</h1>
        <p>IT Service Management Platform - Demo</p>
      </header>
      
      <main class="main-content">
        <div class="welcome-card">
          <h2>✅ Frontend is Running!</h2>
          <p>The Angular frontend is now working with Docker Compose.</p>
          
          <div class="features">
            <h3>🚀 Available Features:</h3>
            <ul>
              <li>📊 <strong>Backend API:</strong> <a href="http://localhost:8000" target="_blank">http://localhost:8000</a></li>
              <li>📖 <strong>API Docs:</strong> <a href="http://localhost:8000/swagger/" target="_blank">Swagger Documentation</a></li>
              <li>⚙️ <strong>Admin Panel:</strong> <a href="http://localhost:8000/admin/" target="_blank">Django Admin</a></li>
              <li>🎨 <strong>Frontend:</strong> You're looking at it! (Port 4200)</li>
            </ul>
          </div>

          <div class="tech-stack">
            <h3>🛠️ Technology Stack:</h3>
            <div class="tech-grid">
              <div class="tech-item">
                <strong>Backend:</strong><br>
                Django REST API<br>
                PostgreSQL 14<br>
                Redis
              </div>
              <div class="tech-item">
                <strong>Frontend:</strong><br>
                Angular 14<br>
                TypeScript<br>
                Material Design
              </div>
              <div class="tech-item">
                <strong>DevOps:</strong><br>
                Docker Compose<br>
                Multi-container<br>
                Hot Reload
              </div>
            </div>
          </div>

          <div class="next-steps">
            <h3>📋 Next Steps:</h3>
            <ol>
              <li>Create a superuser: <code>docker-compose exec backend python manage.py createsuperuser</code></li>
              <li>Visit the API documentation to explore endpoints</li>
              <li>Start building ITSM features (tickets, assets, users)</li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .header {
      text-align: center;
      padding: 2rem;
      color: white;
    }
    
    .header h1 {
      margin: 0;
      font-size: 2.5rem;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
    }
    
    .header p {
      margin: 0.5rem 0 0 0;
      font-size: 1.2rem;
      opacity: 0.9;
    }
    
    .main-content {
      padding: 0 2rem 2rem 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .welcome-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      padding: 2rem;
      margin-bottom: 2rem;
    }
    
    .welcome-card h2 {
      color: #4CAF50;
      margin-top: 0;
      font-size: 1.8rem;
    }
    
    .features ul {
      list-style: none;
      padding: 0;
    }
    
    .features li {
      padding: 0.8rem;
      margin: 0.5rem 0;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 4px solid #2196F3;
    }
    
    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }
    
    .tech-item {
      background: #e3f2fd;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
    }
    
    .next-steps {
      background: #fff3e0;
      padding: 1.5rem;
      border-radius: 8px;
      margin-top: 1.5rem;
    }
    
    .next-steps code {
      background: #f5f5f5;
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
    }
    
    a {
      color: #1976D2;
      text-decoration: none;
    }
    
    a:hover {
      text-decoration: underline;
    }
    
    h3 {
      color: #333;
      margin-top: 1.5rem;
    }
  `]
})
export class AppComponent {
  title = 'ITSM SaaS Platform';
}
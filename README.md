# ITSM SaaS Platform

A comprehensive IT Service Management (ITSM) SaaS platform built with Django REST API backend and Angular frontend.

## 🚀 Features

- **Multi-tenant SaaS Architecture**: Isolated data for different organizations
- **Ticket Management**: Complete incident and service request lifecycle
- **Asset Management**: Track and manage IT assets with history
- **User Management**: Role-based access control
- **REST API**: Comprehensive API with Swagger documentation
- **Real-time Updates**: WebSocket support for live notifications
- **Responsive UI**: Modern Angular Material design

## 🏗️ Architecture

### Backend (Django)

- **Framework**: Django 5.2.7 with Django REST Framework
- **Database**: PostgreSQL with multi-tenant support
- **Authentication**: JWT-based authentication
- **API Documentation**: Auto-generated Swagger/OpenAPI docs
- **Background Tasks**: Celery with Redis

### Frontend (Angular)

- **Framework**: Angular 12+ with TypeScript
- **UI Components**: Angular Material
- **State Management**: Services with RxJS
- **HTTP Client**: Integrated with Django API
- **Responsive Design**: Mobile-first approach

## 📋 Prerequisites

- Python 3.11+
- Node.js 14+
- PostgreSQL 13+
- Redis 6+
- Docker & Docker Compose (optional)

## 🛠️ Quick Start

### Option 1: Docker Compose (Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd ITSM
   ```

2. **Start all services**

   ```bash
   docker-compose up -d
   ```

3. **Run migrations**

   ```bash
   docker-compose exec backend python manage.py migrate
   ```

4. **Create superuser**

   ```bash
   docker-compose exec backend python manage.py createsuperuser
   ```

5. **Access the application**
   - Frontend: http://localhost:4200
   - Backend API: http://localhost:8000
   - Admin Panel: http://localhost:8000/admin
   - API Docs: http://localhost:8000/swagger

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**

   ```bash
   cd backend
   ```

2. **Create virtual environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment**

   ```bash
   cp .env.example .env
   # Edit .env with your database settings
   ```

5. **Run migrations**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser**

   ```bash
   python manage.py createsuperuser
   ```

7. **Start development server**
   ```bash
   python manage.py runserver
   ```

#### Frontend Setup

1. **Navigate to frontend directory**

   ```bash
   cd frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## 📊 API Endpoints

### Authentication

- `POST /api/token/` - Obtain JWT token
- `POST /api/token/refresh/` - Refresh JWT token

### Organizations

- `GET /api/organizations/` - List organizations
- `POST /api/organizations/` - Create organization
- `GET /api/organizations/{id}/members/` - Get organization members

### Tickets

- `GET /api/tickets/` - List tickets
- `POST /api/tickets/` - Create ticket
- `GET /api/tickets/{id}/` - Get ticket details
- `POST /api/tickets/{id}/add_comment/` - Add comment
- `POST /api/tickets/{id}/resolve/` - Resolve ticket

### Assets

- `GET /api/assets/` - List assets
- `POST /api/assets/` - Create asset
- `GET /api/assets/{id}/history/` - Get asset history

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

```env
SECRET_KEY=your-secret-key
DEBUG=True
DB_NAME=itsm_saas
DB_USER=postgres
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=5432
REDIS_URL=redis://localhost:6379/0
```

#### Frontend (environment.ts)

```typescript
export const environment = {
  production: false,
  apiUrl: "http://localhost:8000",
};
```

## 🧪 Testing

### Backend Tests

```bash
cd backend
python manage.py test
```

### Frontend Tests

```bash
cd frontend
npm test
```

## 📚 Development

### Project Structure

```
ITSM/
├── backend/                 # Django REST API
│   ├── itsm_saas/          # Main project settings
│   ├── organizations/       # Multi-tenant organizations
│   ├── tickets/            # Ticket management
│   ├── assets/             # Asset management
│   ├── users/              # User profiles
│   └── requirements.txt    # Python dependencies
├── frontend/               # Angular application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/ # UI components
│   │   │   ├── services/   # API services
│   │   │   └── guards/     # Route guards
│   │   └── environments/   # Environment configs
│   └── package.json       # Node dependencies
├── docker/                # Docker configurations
├── docs/                  # Documentation
└── docker-compose.yml     # Multi-service setup
```

### Adding New Features

1. **Backend (Django)**

   - Create new apps with `python manage.py startapp <app_name>`
   - Define models in `models.py`
   - Create serializers in `serializers.py`
   - Implement views in `views.py`
   - Add URLs in `urls.py`

2. **Frontend (Angular)**
   - Generate components with `ng generate component <component-name>`
   - Create services with `ng generate service <service-name>`
   - Add routing in `app-routing.module.ts`
   - Implement HTTP calls in services

## 🚀 Deployment

### Production Checklist

- [ ] Set `DEBUG=False` in Django settings
- [ ] Configure production database
- [ ] Set up static file serving
- [ ] Configure CORS settings
- [ ] Set up SSL certificates
- [ ] Configure environment variables
- [ ] Set up monitoring and logging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation in `/docs`
- Review the API documentation at `/swagger`

## 🏢 Enterprise Features

This ITSM platform is designed for enterprise use with:

- Multi-tenant architecture
- Role-based access control
- Audit logging
- SLA management
- Custom workflows
- Integration APIs
- Advanced reporting

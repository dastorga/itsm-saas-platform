# 📋 ITSM SaaS Platform - Documentación del Sistema

## 🎯 Descripción General

La **ITSM SaaS Platform** es una plataforma completa de gestión de servicios de TI (IT Service Management) desarrollada como Software as a Service (SaaS). La plataforma permite a las organizaciones gestionar incidentes, solicitudes de servicio, activos y usuarios de manera eficiente y escalable.

## 🏗️ Arquitectura del Sistema

### Arquitectura General

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Base de       │
│   (Angular)     │◄──►│   (Django)      │◄──►│   Datos         │
│   Puerto: 4200  │    │   Puerto: 8000  │    │   (PostgreSQL)  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Contenedor    │    │   Contenedor    │    │   Contenedor    │
│   Docker        │    │   Docker        │    │   Docker        │
│   frontend      │    │   backend       │    │   database      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Stack Tecnológico

#### 🔧 Backend

- **Framework**: Django 5.2 + Django REST Framework
- **Base de Datos**: PostgreSQL 14
- **Cache**: Redis 6
- **Autenticación**: JWT (JSON Web Tokens)
- **Documentación API**: Swagger/OpenAPI
- **Arquitectura**: Multi-tenant SaaS

#### 🎨 Frontend

- **Framework**: Angular 14+
- **Lenguaje**: TypeScript
- **Estilos**: CSS3 con diseño responsivo
- **UI/UX**: Componentes modernos y accesibles
- **Estado**: Servicios Angular con RxJS

#### 🐳 Infraestructura

- **Containerización**: Docker & Docker Compose
- **Proxy Reverso**: Nginx (configuración futura)
- **Monitoreo**: Logs centralizados
- **Escalabilidad**: Arquitectura preparada para microservicios

## 📊 Modelo de Datos

### Entidades Principales

#### 🏢 Organización (Organization)

```sql
- id (UUID)
- name (varchar)
- slug (varchar, único)
- description (text)
- subscription_plan (varchar)
- max_users (integer)
- max_tickets (integer)
- is_active (boolean)
- created_at (datetime)
- updated_at (datetime)
```

#### 🎫 Ticket

```sql
- id (UUID)
- organization_id (FK)
- ticket_number (varchar, único)
- title (varchar)
- description (text)
- ticket_type (enum: incident, service_request, change_request, problem)
- priority (enum: low, medium, high, critical)
- status (enum: open, in_progress, pending, resolved, closed)
- category_id (FK, opcional)
- requester_id (FK)
- assignee_id (FK, opcional)
- created_at (datetime)
- updated_at (datetime)
- due_date (datetime, opcional)
- resolved_at (datetime, opcional)
- closed_at (datetime, opcional)
```

#### 👤 Usuario (User)

```sql
- id (integer)
- username (varchar)
- email (varchar)
- first_name (varchar)
- last_name (varchar)
- is_active (boolean)
- is_staff (boolean)
- date_joined (datetime)
```

#### 💻 Asset

```sql
- id (UUID)
- organization_id (FK)
- asset_tag (varchar)
- name (varchar)
- asset_type (enum: hardware, software, license, network, other)
- status (enum: active, inactive, maintenance, retired, disposed)
- manufacturer (varchar)
- model (varchar)
- serial_number (varchar)
- assigned_to_id (FK, opcional)
- created_at (datetime)
```

## 🔐 Seguridad y Autenticación

### Autenticación JWT

1. **Login**: Usuario/contraseña → Token JWT
2. **Autorización**: Token en header `Authorization: Bearer <token>`
3. **Refresh**: Token de refresh para renovar acceso
4. **Expiración**: Tokens con tiempo de vida limitado

### Multi-tenancy

- Cada organización es un tenant independiente
- Aislamiento de datos por organización
- Usuarios pueden pertenecer a múltiples organizaciones
- Roles y permisos por organización

## 🎨 Interfaz de Usuario

### Diseño Visual

- **Paleta de colores**: Gradientes modernos (azul a púrpura)
- **Tipografía**: Segoe UI, sistema nativo
- **Iconografía**: Emojis y símbolos Unicode
- **Responsive**: Diseño adaptable móvil-primero

### Componentes Principales

#### 🔑 Login

- Formulario centrado con validación
- Diseño card con gradientes
- Mensajes de error elegantes
- Redirección automática

#### 📊 Dashboard

- Métricas en tiempo real
- Tarjetas de estadísticas
- Lista de tickets recientes
- Acciones rápidas
- Navegación intuitiva

#### 📝 Formulario de Tickets

- Validación en tiempo real
- Campos organizados por secciones
- Selectors dinámicos
- Feedback visual inmediato

#### 📋 Lista de Tickets

- Tabla responsive con filtros
- Paginación inteligente
- Búsqueda en tiempo real
- Badges de estado/prioridad
- Ordenamiento múltiple

## 🔌 API Endpoints

### Autenticación

```
POST /api/token/          # Obtener tokens
POST /api/token/refresh/  # Refrescar token
```

### Tickets

```
GET    /api/tickets/           # Listar tickets
POST   /api/tickets/           # Crear ticket
GET    /api/tickets/{id}/      # Obtener ticket
PUT    /api/tickets/{id}/      # Actualizar ticket
DELETE /api/tickets/{id}/      # Eliminar ticket
POST   /api/tickets/{id}/resolve/  # Resolver ticket
POST   /api/tickets/{id}/close/    # Cerrar ticket
```

### Organizaciones

```
GET    /api/organizations/     # Listar organizaciones
POST   /api/organizations/     # Crear organización
GET    /api/organizations/{id}/ # Obtener organización
PUT    /api/organizations/{id}/ # Actualizar organización
```

### Assets

```
GET    /api/assets/           # Listar assets
POST   /api/assets/           # Crear asset
GET    /api/assets/{id}/      # Obtener asset
PUT    /api/assets/{id}/      # Actualizar asset
```

## 🚀 Instalación y Despliegue

### Requisitos

- Docker & Docker Compose
- Git
- Puerto 4200 (frontend) y 8000 (backend) disponibles

### Instalación Rápida

```bash
# Clonar repositorio
git clone https://github.com/dastorga/itsm-saas-platform.git
cd itsm-saas-platform

# Levantar servicios
docker-compose up -d

# Ejecutar migraciones
docker-compose exec backend python manage.py migrate

# Crear superusuario
docker-compose exec backend python manage.py createsuperuser
```

### URLs de Acceso

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8000
- **Admin Django**: http://localhost:8000/admin
- **Documentación API**: http://localhost:8000/swagger

## 📈 Funcionalidades Implementadas

### ✅ Completadas

- [x] Autenticación JWT completa
- [x] Dashboard interactivo con métricas
- [x] Gestión completa de tickets (CRUD)
- [x] Interfaz responsive moderna
- [x] Filtros y búsqueda avanzada
- [x] Multi-tenancy con organizaciones
- [x] API REST documentada
- [x] Conteneirización Docker

### 🔄 En Desarrollo

- [ ] Gestión de assets (UI pendiente)
- [ ] Sistema de comentarios en tickets
- [ ] Archivos adjuntos
- [ ] Notificaciones en tiempo real
- [ ] Reportes y analytics
- [ ] Sistema de roles granular

### 🎯 Roadmap Futuro

- [ ] Integración con sistemas externos
- [ ] API webhooks
- [ ] Mobile app
- [ ] Automatización de workflows
- [ ] BI y dashboards avanzados
- [ ] SSO (Single Sign-On)

## 👥 Roles y Permisos

### Tipos de Usuario

1. **Admin**: Control total de la organización
2. **Manager**: Gestión de equipos y tickets
3. **Agent**: Resolución de tickets asignados
4. **User**: Creación de tickets y solicitudes

### Permisos por Rol

| Funcionalidad           | Admin | Manager | Agent | User |
| ----------------------- | ----- | ------- | ----- | ---- |
| Crear tickets           | ✅    | ✅      | ✅    | ✅   |
| Ver todos los tickets   | ✅    | ✅      | ✅    | ❌   |
| Asignar tickets         | ✅    | ✅      | ❌    | ❌   |
| Gestionar usuarios      | ✅    | ✅      | ❌    | ❌   |
| Configurar organización | ✅    | ❌      | ❌    | ❌   |

## 📞 Soporte y Contacto

- **GitHub**: https://github.com/dastorga/itsm-saas-platform
- **Issues**: Reportar bugs y solicitar funcionalidades
- **Wiki**: Documentación técnica detallada
- **Releases**: Historial de versiones

---

_Documentación actualizada: Octubre 2025_

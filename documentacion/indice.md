# 📚 Índice de Documentación - ITSM SaaS Platform

Bienvenido a la documentación completa del **ITSM SaaS Platform**. Esta documentación proporciona toda la información necesaria para entender, instalar, desarrollar y mantener la plataforma.

## 📋 Contenido de la Documentación

### 📖 Documentación Principal

- **[README.md](../README.md)** - Visión general del proyecto, instalación rápida y roadmap
- **[DEVELOPMENT.md](../docs/DEVELOPMENT.md)** - Guía detallada para desarrolladores

### 🏗️ Arquitectura y Diseño

- **[arquitectura.md](./diagramas/arquitectura.md)** - Diagramas completos de arquitectura del sistema
- **[flujos-usuario.md](./diagramas/flujos-usuario.md)** - Flujos de trabajo y casos de uso

### 🖼️ Recursos Visuales

#### 📸 Screenshots y Mockups

- **[screenshots.md](./imagenes/screenshots.md)** - Capturas de pantalla y diseños ASCII de la interfaz

#### 📊 Diagramas SVG

- **[arquitectura-sistema.svg](./imagenes/arquitectura-sistema.svg)** - Diagrama visual de la arquitectura completa
- **[flujo-datos-ticket.svg](./imagenes/flujo-datos-ticket.svg)** - Flujo de datos para creación de tickets
- **[modelo-datos.svg](./imagenes/modelo-datos.svg)** - Modelo entidad-relación de la base de datos

## 🎯 Guías de Inicio Rápido

### Para Desarrolladores

1. **[Instalación](../README.md#-instalación)** - Configuración del entorno de desarrollo
2. **[API Reference](../README.md#-endpoints-de-la-api)** - Documentación de endpoints REST
3. **[Arquitectura](./diagramas/arquitectura.md#arquitectura-de-alto-nivel)** - Entender la estructura del sistema

### Para Usuarios Finales

1. **[Login](./imagenes/screenshots.md#-página-de-login)** - Cómo acceder al sistema
2. **[Dashboard](./imagenes/screenshots.md#-dashboard-principal)** - Navegación en el panel principal
3. **[Tickets](./imagenes/screenshots.md#-formulario-de-creación-de-ticket)** - Gestión de tickets e incidentes

### Para Administradores

1. **[Configuración](../README.md#-configuración)** - Variables de entorno y configuración inicial
2. **[Base de Datos](./imagenes/modelo-datos.svg)** - Estructura y relaciones de datos
3. **[Docker](../README.md#-docker)** - Despliegue con contenedores

## 🔧 Tecnologías Utilizadas

### Backend

- **Django 4.2** - Framework web principal
- **Django REST Framework** - API REST
- **PostgreSQL 15** - Base de datos principal
- **Redis** - Cache y sesiones
- **JWT** - Autenticación

### Frontend

- **Angular 14+** - Framework SPA
- **TypeScript** - Lenguaje principal
- **Angular Material** - Componentes UI
- **RxJS** - Programación reactiva

### DevOps & Tools

- **Docker & Docker Compose** - Contenedores
- **Git** - Control de versiones
- **Swagger/OpenAPI** - Documentación API

## 📁 Estructura de Archivos

```
documentacion/
├── indice.md                    # Este archivo (índice)
├── diagramas/
│   ├── arquitectura.md          # Diagramas de arquitectura (Mermaid)
│   └── flujos-usuario.md        # Flujos de trabajo y casos de uso
└── imagenes/
    ├── screenshots.md           # Mockups y diseños ASCII
    ├── arquitectura-sistema.svg # Diagrama visual de arquitectura
    ├── flujo-datos-ticket.svg  # Flujo de creación de tickets
    └── modelo-datos.svg         # Modelo entidad-relación
```

## 🎨 Convenciones de Documentación

### Iconos Utilizados

- 🏠 **Dashboard/Home** - Página principal
- 🎫 **Tickets** - Gestión de tickets e incidentes
- 💻 **Assets** - Gestión de activos
- 👤 **Usuarios** - Gestión de usuarios
- 🏢 **Organizaciones** - Multi-tenancy
- 🔐 **Autenticación** - Login y permisos
- 📊 **Reportes** - Dashboards y estadísticas
- ⚙️ **Configuración** - Ajustes del sistema
- 🐍 **Backend** - Django/Python
- ⚡ **Frontend** - Angular/TypeScript
- 🐘 **Database** - PostgreSQL
- 🔴 **Redis** - Cache
- 🐳 **Docker** - Contenedores

### Códigos de Color

- 🔴 **Crítico/Error** - Problemas urgentes
- 🟠 **Alta Prioridad** - Importante pero no crítico
- 🟡 **En Proceso** - Trabajando en ello
- 🟢 **Completado** - Terminado exitosamente
- 🔵 **Información** - Datos informativos
- ⚫ **Cerrado** - Finalizado o inactivo

## 📝 Cómo Contribuir a la Documentación

### Agregar Nueva Documentación

1. Crear archivo en la carpeta apropiada (`diagramas/` o `imagenes/`)
2. Seguir las convenciones de nomenclatura
3. Incluir iconos y formato consistente
4. Actualizar este índice con el nuevo contenido

### Crear Diagramas

- **Mermaid**: Para diagramas de flujo y arquitectura en Markdown
- **SVG**: Para diagramas más complejos y personalizados
- **ASCII Art**: Para mockups simples y rápidos

### Estándares de Calidad

- ✅ Usar iconos consistentes
- ✅ Incluir ejemplos prácticos
- ✅ Mantener actualizada la información
- ✅ Revisar ortografía y gramática
- ✅ Referenciar otros documentos cuando sea relevante

## 🔗 Enlaces Útiles

### Repositorio Principal

- **[GitHub Repository](https://github.com/usuario/itsm-saas-platform)** - Código fuente
- **[Issues](https://github.com/usuario/itsm-saas-platform/issues)** - Reportar bugs
- **[Wiki](https://github.com/usuario/itsm-saas-platform/wiki)** - Documentación adicional

### APIs y Servicios

- **[Swagger UI](http://localhost:8000/swagger/)** - Documentación API interactiva
- **[Django Admin](http://localhost:8000/admin/)** - Panel de administración
- **[Frontend Dev](http://localhost:4200/)** - Aplicación Angular en desarrollo

### Herramientas de Desarrollo

- **[Django Documentation](https://docs.djangoproject.com/)** - Documentación oficial Django
- **[Angular Guide](https://angular.io/guide/setup-local)** - Guía oficial Angular
- **[PostgreSQL Docs](https://www.postgresql.org/docs/)** - Documentación PostgreSQL

---

## 📞 Soporte y Contacto

Para preguntas sobre la documentación o el proyecto:

- **Email**: soporte@itsm-platform.com
- **Discord**: [Servidor del Proyecto](https://discord.gg/itsm-platform)
- **GitHub Issues**: Para reportes de bugs y solicitudes de características

---

_Documentación creada: Octubre 2025 | Última actualización: Octubre 2025_

**Versión de la Documentación**: 1.0.0  
**Versión del Sistema**: 1.0.0  
**Mantenida por**: Equipo de Desarrollo ITSM SaaS Platform

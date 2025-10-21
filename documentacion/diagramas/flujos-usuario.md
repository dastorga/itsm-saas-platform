# 🔄 Flujos de Usuario - ITSM SaaS Platform

## 1. Flujo de Registro y Login

### Login de Usuario

```mermaid
flowchart TD
    START([🏁 Inicio]) --> LOGIN[📱 Página de Login]
    LOGIN --> INPUT{📝 Ingresar Credenciales}
    INPUT --> |Email + Password| VALIDATE[🔍 Validar Credenciales]

    VALIDATE --> |✅ Válidas| SUCCESS[✨ Login Exitoso]
    VALIDATE --> |❌ Inválidas| ERROR[⚠️ Error de Login]

    SUCCESS --> TOKEN[🎫 Recibir JWT Token]
    TOKEN --> STORE[💾 Almacenar Token]
    STORE --> REDIRECT[🔄 Redireccionar a Dashboard]
    REDIRECT --> END([🏁 Fin])

    ERROR --> SHOW_ERROR[📢 Mostrar Mensaje de Error]
    SHOW_ERROR --> LOGIN

    style START fill:#e1f5fe
    style END fill:#e8f5e8
    style ERROR fill:#ffebee
    style SUCCESS fill:#e8f5e8
```

### Estados del Login

- **Inicial**: Formulario vacío esperando credenciales
- **Validando**: Enviando petición al backend
- **Error**: Credenciales incorrectas o error de conexión
- **Éxito**: Autenticación exitosa, redirigiendo

## 2. Flujo de Gestión de Tickets

### Creación de Ticket

```mermaid
flowchart TD
    START([🏁 Acceso Autorizado]) --> DASHBOARD[📊 Dashboard]
    DASHBOARD --> CREATE_BTN[➕ Clic 'Crear Ticket']
    CREATE_BTN --> FORM[📝 Formulario de Creación]

    FORM --> FILL{📋 Llenar Campos}
    FILL --> |Campos requeridos| VALIDATE[🔍 Validar Datos]
    FILL --> |Campos faltantes| ERROR_FORM[⚠️ Error de Validación]

    VALIDATE --> |✅ Datos válidos| SUBMIT[📤 Enviar Ticket]
    VALIDATE --> |❌ Datos inválidos| ERROR_FORM

    SUBMIT --> |Éxito| SUCCESS[✨ Ticket Creado]
    SUBMIT --> |Error| ERROR_API[⚠️ Error del Servidor]

    SUCCESS --> SHOW_SUCCESS[📢 Mensaje de Éxito]
    SUCCESS --> ASSIGN_NUMBER[🔢 Asignar Número de Ticket]
    ASSIGN_NUMBER --> REDIRECT_LIST[🔄 Ir a Lista de Tickets]

    ERROR_FORM --> FORM
    ERROR_API --> SHOW_ERROR[📢 Mostrar Error]
    SHOW_ERROR --> FORM
    REDIRECT_LIST --> END([🏁 Fin])

    style START fill:#e1f5fe
    style END fill:#e8f5e8
    style ERROR_FORM fill:#ffebee
    style ERROR_API fill:#ffebee
    style SUCCESS fill:#e8f5e8
```

### Campos del Formulario de Ticket

1. **Título** (requerido)

   - Descripción breve del problema
   - Mínimo 5 caracteres

2. **Descripción** (requerido)

   - Detalle completo del problema
   - Mínimo 10 caracteres

3. **Tipo de Ticket**

   - Incidente
   - Solicitud de Servicio
   - Cambio
   - Problema

4. **Prioridad**

   - Baja
   - Media
   - Alta
   - Crítica

5. **Categoría** (opcional)

   - Hardware
   - Software
   - Red
   - Acceso
   - Otros

6. **Fecha Límite** (opcional)
   - No puede ser anterior a hoy

### Lista de Tickets

```mermaid
flowchart TD
    START([🏁 Navegación]) --> LIST[📋 Lista de Tickets]
    LIST --> LOAD[⏳ Cargar Tickets]
    LOAD --> |Éxito| DISPLAY[📊 Mostrar Tickets]
    LOAD --> |Error| ERROR[⚠️ Error de Carga]

    DISPLAY --> ACTIONS{🎯 Acciones del Usuario}

    ACTIONS --> |Ver Detalles| VIEW[👁️ Ver Ticket]
    ACTIONS --> |Editar| EDIT[✏️ Editar Ticket]
    ACTIONS --> |Eliminar| DELETE[🗑️ Eliminar Ticket]
    ACTIONS --> |Filtrar| FILTER[🔍 Filtrar Lista]
    ACTIONS --> |Ordenar| SORT[📊 Ordenar Lista]

    VIEW --> VIEW_DETAIL[📄 Página de Detalles]
    EDIT --> EDIT_FORM[📝 Formulario de Edición]
    DELETE --> CONFIRM[❓ Confirmar Eliminación]
    FILTER --> APPLY_FILTER[🔧 Aplicar Filtros]
    SORT --> APPLY_SORT[🔧 Aplicar Ordenamiento]

    CONFIRM --> |Sí| DELETE_API[🗑️ Eliminar en Servidor]
    CONFIRM --> |No| DISPLAY

    DELETE_API --> |Éxito| REFRESH[🔄 Actualizar Lista]
    DELETE_API --> |Error| ERROR_DELETE[⚠️ Error al Eliminar]

    APPLY_FILTER --> DISPLAY
    APPLY_SORT --> DISPLAY
    REFRESH --> DISPLAY
    ERROR --> DISPLAY
    ERROR_DELETE --> DISPLAY

    VIEW_DETAIL --> END([🏁 Fin])
    EDIT_FORM --> END

    style START fill:#e1f5fe
    style END fill:#e8f5e8
    style ERROR fill:#ffebee
    style ERROR_DELETE fill:#ffebee
```

## 3. Flujo de Dashboard

### Carga del Dashboard

```mermaid
flowchart TD
    START([🏁 Usuario Autenticado]) --> CHECK_AUTH[🔐 Verificar Autenticación]
    CHECK_AUTH --> |Token válido| LOAD_DATA[📊 Cargar Datos del Dashboard]
    CHECK_AUTH --> |Token inválido| LOGIN_REDIRECT[🔄 Redireccionar a Login]

    LOAD_DATA --> PARALLEL{🔄 Cargas Paralelas}

    PARALLEL --> TICKETS[🎫 Cargar Tickets Recientes]
    PARALLEL --> STATS[📈 Cargar Estadísticas]
    PARALLEL --> ALERTS[🚨 Cargar Alertas]

    TICKETS --> |Éxito| DISPLAY_TICKETS[📋 Mostrar Tickets]
    TICKETS --> |Error| ERROR_TICKETS[⚠️ Error Tickets]

    STATS --> |Éxito| DISPLAY_STATS[📊 Mostrar Estadísticas]
    STATS --> |Error| ERROR_STATS[⚠️ Error Estadísticas]

    ALERTS --> |Éxito| DISPLAY_ALERTS[🔔 Mostrar Alertas]
    ALERTS --> |Error| ERROR_ALERTS[⚠️ Error Alertas]

    DISPLAY_TICKETS --> READY[✅ Dashboard Listo]
    DISPLAY_STATS --> READY
    DISPLAY_ALERTS --> READY

    ERROR_TICKETS --> PARTIAL[⚠️ Carga Parcial]
    ERROR_STATS --> PARTIAL
    ERROR_ALERTS --> PARTIAL

    READY --> INTERACT[🖱️ Interacción del Usuario]
    PARTIAL --> INTERACT

    INTERACT --> |Crear Ticket| CREATE_TICKET[➕ Ir a Crear Ticket]
    INTERACT --> |Ver Todos| VIEW_ALL[📋 Ir a Lista Completa]
    INTERACT --> |Actualizar| REFRESH[🔄 Refrescar Dashboard]

    CREATE_TICKET --> END([🏁 Fin])
    VIEW_ALL --> END
    REFRESH --> LOAD_DATA
    LOGIN_REDIRECT --> END

    style START fill:#e1f5fe
    style END fill:#e8f5e8
    style ERROR_TICKETS fill:#ffebee
    style ERROR_STATS fill:#ffebee
    style ERROR_ALERTS fill:#ffebee
    style READY fill:#e8f5e8
```

### Widgets del Dashboard

1. **Estadísticas Rápidas**

   - Total de tickets
   - Tickets abiertos
   - Tickets asignados a mí
   - Tickets vencidos

2. **Tickets Recientes**

   - Últimos 5 tickets creados
   - Estado y prioridad
   - Enlaces rápidos

3. **Alertas del Sistema**
   - Tickets críticos
   - SLA próximos a vencer
   - Notificaciones importantes

## 4. Flujo de Navegación

### Estructura de Navegación

```mermaid
graph TD
    ROOT[🏠 Aplicación Root] --> AUTH{🔐 ¿Autenticado?}

    AUTH --> |No| LOGIN[🔑 Login Page]
    AUTH --> |Sí| MAIN[🏠 Main Layout]

    LOGIN --> |Éxito| MAIN

    MAIN --> NAV[🧭 Navegación Principal]
    NAV --> DASHBOARD[📊 Dashboard]
    NAV --> TICKETS_NAV[🎫 Tickets]
    NAV --> ASSETS_NAV[💻 Assets]
    NAV --> SETTINGS[⚙️ Configuración]

    TICKETS_NAV --> TICKETS_LIST[📋 Lista de Tickets]
    TICKETS_NAV --> TICKETS_CREATE[➕ Crear Ticket]

    TICKETS_LIST --> TICKET_DETAIL[👁️ Detalle de Ticket]
    TICKET_DETAIL --> TICKET_EDIT[✏️ Editar Ticket]

    ASSETS_NAV --> ASSETS_LIST[📋 Lista de Assets]
    ASSETS_NAV --> ASSETS_CREATE[➕ Crear Asset]

    SETTINGS --> PROFILE[👤 Perfil]
    SETTINGS --> ORG_SETTINGS[🏢 Configuración de Organización]

    style ROOT fill:#e1f5fe
    style DASHBOARD fill:#e8f5e8
    style LOGIN fill:#fff3e0
```

## 5. Estados de Carga y Error

### Manejo de Estados

```mermaid
stateDiagram-v2
    [*] --> Loading
    Loading --> Success: Data loaded successfully
    Loading --> Error: Request failed

    Success --> Loading: Refresh data
    Error --> Loading: Retry
    Error --> [*]: Give up

    Success --> [*]: Component destroyed

    state Loading {
        [*] --> ShowSpinner
        ShowSpinner --> DisableUI
    }

    state Success {
        [*] --> DisplayData
        DisplayData --> EnableInteractions
    }

    state Error {
        [*] --> ShowErrorMessage
        ShowErrorMessage --> ShowRetryButton
    }
```

### Tipos de Errores

1. **Errores de Red**

   - Sin conexión a internet
   - Servidor no disponible
   - Timeout de conexión

2. **Errores de Autenticación**

   - Token expirado
   - Credenciales inválidas
   - Permisos insuficientes

3. **Errores de Validación**

   - Campos requeridos vacíos
   - Formato de datos incorrecto
   - Valores fuera de rango

4. **Errores del Servidor**
   - Error interno del servidor (500)
   - Recurso no encontrado (404)
   - Conflicto de datos (409)

---

_Documentación de flujos: Octubre 2025_

# 📸 Screenshots y Mockups - ITSM SaaS Platform

## 🔑 Página de Login

```ascii
┌─────────────────────────────────────────────────────────────┐
│                    ITSM SaaS Platform                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    ┌─────────────────────────────────────────────────┐     │
│    │                                                 │     │
│    │              🔐 Iniciar Sesión                  │     │
│    │                                                 │     │
│    │  Email:    ┌───────────────────────────────┐    │     │
│    │            │ admin@example.com             │    │     │
│    │            └───────────────────────────────┘    │     │
│    │                                                 │     │
│    │  Password: ┌───────────────────────────────┐    │     │
│    │            │ ••••••••••••••••••••••••••••  │    │     │
│    │            └───────────────────────────────┘    │     │
│    │                                                 │     │
│    │            ┌─────────────────────────────┐      │     │
│    │            │        INGRESAR           │      │     │
│    │            └─────────────────────────────┘      │     │
│    │                                                 │     │
│    │           ¿Olvidaste tu contraseña?            │     │
│    │                                                 │     │
│    └─────────────────────────────────────────────────┘     │
│                                                             │
│                    Powered by Django + Angular             │
└─────────────────────────────────────────────────────────────┘
```

**Características del Login:**

- Formulario responsive con validación en tiempo real
- Campos requeridos marcados con asterisco
- Mensajes de error en rojo debajo de cada campo
- Botón de login deshabilitado hasta validación exitosa
- Link para recuperación de contraseña

---

## 📊 Dashboard Principal

```ascii
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ITSM Platform    🏠 Dashboard  🎫 Tickets  💻 Assets  ⚙️ Config   👤 Admin    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ 📊 Dashboard - Bienvenido Juan Pérez                     🔔 3 notificaciones  │
│                                                                                 │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐                │
│ │     45      │ │     12      │ │      8      │ │      2      │                │
│ │   TOTAL     │ │   ABIERTOS  │ │ ASIGNADOS   │ │  VENCIDOS   │                │
│ │  TICKETS    │ │             │ │   A MÍ      │ │             │                │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘                │
│                                                                                 │
│ ┌─────────────────────────────────────┐ ┌───────────────────────────────────┐   │
│ │        📋 Tickets Recientes         │ │       🚨 Alertas Críticas        │   │
│ ├─────────────────────────────────────┤ ├───────────────────────────────────┤   │
│ │ #TK-2023-001 📧 Error Email         │ │ ⚠️  3 tickets críticos pendientes │   │
│ │ Alta        Hace 2 horas           │ │                                   │   │
│ │                                     │ │ 🕐 2 tickets próximos a vencer SLA│   │
│ │ #TK-2023-002 🖥️  PC no enciende     │ │                                   │   │
│ │ Media       Hace 4 horas           │ │ 📈 Incremento 20% tickets hoy     │   │
│ │                                     │ │                                   │   │
│ │ #TK-2023-003 🌐 Red lenta           │ │ 👥 5 usuarios nuevos pendientes   │   │
│ │ Baja        Hace 6 horas           │ │                                   │   │
│ │                                     │ │                                   │   │
│ │ ┌─────────────┐ ┌─────────────────┐ │ │ ┌───────────────────────────────┐ │   │
│ │ │ VER TODOS   │ │ CREAR TICKET    │ │ │ │        VER REPORTES          │ │   │
│ │ └─────────────┘ └─────────────────┘ │ │ └───────────────────────────────┘ │   │
│ └─────────────────────────────────────┘ └───────────────────────────────────┘   │
│                                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │                        📈 Gráfico de Tickets por Mes                       │ │
│ │                                                                             │ │
│ │     45│                                                                     │ │
│ │       │     ████                                                            │ │
│ │     30│     ████         ████                                               │ │
│ │       │     ████  ████   ████         ████                                 │ │
│ │     15│████ ████  ████   ████  ████   ████                                 │ │
│ │       │████ ████  ████   ████  ████   ████                                 │ │
│ │      0└─────────────────────────────────────────────────────────────────   │ │
│ │        Ene  Feb   Mar   Abr   May   Jun                                    │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Widgets del Dashboard:**

- **Estadísticas rápidas**: Contadores en tiempo real de tickets
- **Tickets recientes**: Lista de últimos 5 tickets con estados y prioridad
- **Alertas críticas**: Notificaciones importantes y SLA
- **Gráfico de tendencias**: Visualización de tickets por período
- **Navegación rápida**: Botones de acceso directo a funciones principales

---

## ➕ Formulario de Creación de Ticket

```ascii
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ITSM Platform    🏠 Dashboard  🎫 Tickets  💻 Assets  ⚙️ Config   👤 Admin    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ 🎫 Tickets > ➕ Crear Nuevo Ticket                                             │
│                                                                                 │
│ ┌─────────────────────────────────────────────────────────────────────────────┐ │
│ │                          📝 Nuevo Ticket                                   │ │
│ ├─────────────────────────────────────────────────────────────────────────────┤ │
│ │                                                                             │ │
│ │ Título * ┌─────────────────────────────────────────────────────────────────┐ │ │
│ │          │ No puedo acceder al sistema de nóminas                        │ │ │
│ │          └─────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                             │ │
│ │ Descripción *                                                              │ │
│ │ ┌─────────────────────────────────────────────────────────────────────────┐ │ │
│ │ │ Al intentar ingresar al sistema de nóminas con mis credenciales        │ │ │
│ │ │ habituales, aparece un mensaje de error "Usuario o contraseña          │ │ │
│ │ │ incorrectos". He intentado resetear la contraseña pero no recibo       │ │ │
│ │ │ el email de recuperación. Necesito acceso urgente para procesar        │ │ │
│ │ │ las nóminas de fin de mes.                                             │ │ │
│ │ │                                                                         │ │ │
│ │ └─────────────────────────────────────────────────────────────────────────┘ │ │
│ │                                                                             │ │
│ │ Tipo de Ticket    ┌─────────────────┐   Prioridad      ┌─────────────────┐ │ │
│ │                   │ Incidente    ▼ │                   │ Alta         ▼ │ │ │
│ │                   └─────────────────┘                   └─────────────────┘ │ │
│ │                                                                             │ │
│ │ Categoría         ┌─────────────────┐   Fecha Límite   ┌─────────────────┐ │ │
│ │                   │ Accesos      ▼ │                   │ 31/10/2023      │ │ │
│ │                   └─────────────────┘                   └─────────────────┘ │ │
│ │                                                                             │ │
│ │ Archivos Adjuntos                                                          │ │
│ │ ┌─────────────────────────────────────┐  ┌─────────────────────────────────┐ │ │
│ │ │     📎 Seleccionar Archivos         │  │        🗑️ Limpiar              │ │ │
│ │ └─────────────────────────────────────┘  └─────────────────────────────────┘ │ │
│ │                                                                             │ │
│ │     * Campos obligatorios                                                   │ │
│ │                                                                             │ │
│ │ ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────────┐ │ │
│ │ │   CANCELAR      │  │    GUARDAR      │  │      CREAR TICKET             │ │ │
│ │ └─────────────────┘  │   BORRADOR      │  └─────────────────────────────────┘ │ │
│ │                      └─────────────────┘                                   │ │
│ └─────────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Funcionalidades del Formulario:**

- **Validación en tiempo real**: Campos se validan mientras el usuario escribe
- **Campos obligatorios**: Marcados con asterisco rojo
- **Dropdowns**: Tipo, prioridad y categoría con opciones predefinidas
- **Fecha límite**: Selector de fecha con validación (no fecha anterior a hoy)
- **Adjuntos**: Drag & drop para archivos con preview
- **Estados**: Borrador, enviado, en proceso

---

## 📋 Lista de Tickets

```ascii
┌─────────────────────────────────────────────────────────────────────────────────┐
│ ITSM Platform    🏠 Dashboard  🎫 Tickets  💻 Assets  ⚙️ Config   👤 Admin    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ 🎫 Gestión de Tickets                           ┌─────────────────────────────┐  │
│                                                 │      ➕ CREAR TICKET       │  │
│ ┌───────────────────────────────────────────────┘─────────────────────────────┐  │
│ │ 🔍 Filtros:                                                                  │  │
│ │                                                                              │  │
│ │ Estado:     ┌─────────────┐  Prioridad: ┌─────────────┐  Fecha: ┌─────────┐ │  │
│ │             │ Todos    ▼ │              │ Todas    ▼ │         │ Hoy  ▼ │ │  │
│ │             └─────────────┘              └─────────────┘         └─────────┘ │  │
│ │                                                                              │  │
│ │ Buscar: ┌──────────────────────────────────────────────┐ ┌─────────────────┐ │  │
│ │         │ Escriba título, descripción o número...     │ │    🔍 BUSCAR    │ │  │
│ │         └──────────────────────────────────────────────┘ └─────────────────┘ │  │
│ └──────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                 │
│ ┌──────────────────────────────────────────────────────────────────────────────┐ │
│ │                                📋 Lista de Tickets                          │ │
│ ├──────┬───────────────────────────┬────────────┬────────────┬────────────────┤ │
│ │ #    │ Título                    │ Estado     │ Prioridad  │ Fecha Creación │ │
│ ├──────┼───────────────────────────┼────────────┼────────────┼────────────────┤ │
│ │ 001  │ 📧 Error Email Server     │ 🔴 Abierto │ 🔥 Crítica │ 28/10 14:30    │ │
│ │      │ Sistema no envía correos  │            │            │                │ │
│ │      │ [Ver] [Editar] [Cerrar]   │            │            │                │ │
│ ├──────┼───────────────────────────┼────────────┼────────────┼────────────────┤ │
│ │ 002  │ 🖥️ PC no enciende          │ 🟡 En Proc │ 🟠 Alta    │ 28/10 12:15    │ │
│ │      │ Computadora sala 201      │            │            │                │ │
│ │      │ [Ver] [Editar] [Cerrar]   │            │            │                │ │
│ ├──────┼───────────────────────────┼────────────┼────────────┼────────────────┤ │
│ │ 003  │ 🌐 Red lenta               │ 🟢 Resuelto│ 🔵 Media   │ 27/10 16:45    │ │
│ │      │ Navegación muy lenta      │            │            │                │ │
│ │      │ [Ver] [Reabrir]           │            │            │                │ │
│ ├──────┼───────────────────────────┼────────────┼────────────┼────────────────┤ │
│ │ 004  │ 🔐 Reset contraseña        │ 🔴 Abierto │ 🔵 Baja    │ 27/10 09:20    │ │
│ │      │ Usuario bloqueado         │            │            │                │ │
│ │      │ [Ver] [Editar] [Cerrar]   │            │            │                │ │
│ ├──────┼───────────────────────────┼────────────┼────────────┼────────────────┤ │
│ │ 005  │ 💾 Backup falló            │ ⚫ Cerrado  │ 🟠 Alta    │ 26/10 23:00    │ │
│ │      │ Error en backup nocturno  │            │            │                │ │
│ │      │ [Ver] [Reabrir]           │            │            │                │ │
│ └──────┴───────────────────────────┴────────────┴────────────┴────────────────┘ │
│                                                                                 │
│ ┌────────────────────────────────────────────────────────────────────────────┐  │
│ │                         📄 Página 1 de 3                                  │  │
│ │                   [◀ Anterior]  [1] [2] [3]  [Siguiente ▶]                │  │
│ │                         Mostrando 5 de 15 tickets                         │  │
│ └────────────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

**Características de la Lista:**

- **Filtros avanzados**: Por estado, prioridad, fecha, categoría
- **Búsqueda en tiempo real**: Busca en título, descripción y número
- **Ordenamiento**: Clickeable en headers de columnas
- **Paginación**: Navegación por páginas con conteo
- **Acciones rápidas**: Ver, editar, cerrar, reabrir tickets
- **Colores por estado**: Visual feedback inmediato

---

## 📱 Vista Móvil - Responsive Design

```ascii
┌─────────────────────────┐
│   ITSM SaaS Platform    │
├─────────────────────────┤
│                         │
│ ☰ Menu                  │
│                         │
│ 📊 Dashboard            │
│                         │
│ ┌─────────┬─────────────┐│
│ │   45    │     12      ││
│ │ TOTAL   │  ABIERTOS   ││
│ └─────────┴─────────────┘│
│ ┌─────────┬─────────────┐│
│ │    8    │      2      ││
│ │ASIGNADOS│  VENCIDOS   ││
│ └─────────┴─────────────┘│
│                         │
│ 📋 Tickets Recientes    │
│ ┌─────────────────────┐ │
│ │ #001 📧 Error Email │ │
│ │ Alta - Hace 2h      │ │
│ │ [Ver] [Editar]      │ │
│ └─────────────────────┘ │
│ ┌─────────────────────┐ │
│ │ #002 🖥️ PC no       │ │
│ │ Media - Hace 4h     │ │
│ │ [Ver] [Editar]      │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │   ➕ CREAR TICKET   │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │   📋 VER TODOS      │ │
│ └─────────────────────┘ │
│                         │
└─────────────────────────┘
```

**Adaptaciones Móviles:**

- **Navegación hamburguer**: Menú colapsable en pantallas pequeñas
- **Cards apiladas**: Estadísticas en filas de 2x2
- **Botones táctiles**: Tamaño optimizado para dedos
- **Texto legible**: Fuentes y espaciado apropiados
- **Scroll suave**: Navegación fluida vertical

---

## 🎨 Paleta de Colores del Sistema

```
🔴 Estados Críticos:    #f44336 (Error, Crítico, Vencido)
🟠 Estados Alertas:     #ff9800 (Alta prioridad, Advertencias)
🟡 Estados En Proceso:  #ffc107 (En proceso, Pendiente)
🟢 Estados Exitosos:    #4caf50 (Completado, Resuelto)
🔵 Estados Informativos:#2196f3 (Info, Baja prioridad)
⚫ Estados Cerrados:    #424242 (Cerrado, Inactivo)

🎨 Colores Primarios:
- Azul Principal:    #1976d2
- Azul Secundario:   #42a5f5
- Verde Éxito:       #388e3c
- Gris Texto:        #424242
- Gris Claro:        #f5f5f5
```

---

_Screenshots y diseños: Octubre 2025_

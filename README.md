# ImproCode — Panel de Gestión Empresarial

Aplicación full-stack construida con **Angular 18** y **Node.js/Express** para gestionar productos, eventos de agenda, gráficos de ventas y ubicaciones de tiendas en mapa interactivo.

---

## Tecnologías

| Capa | Tecnología |
|------|------------|
| Frontend | Angular 18 (standalone), Bootstrap 5, TypeScript |
| Backend | Node.js, Express, TypeScript |
| Base de datos | MySQL vía XAMPP |
| Calendario | FullCalendar |
| Gráficos | Chart.js |
| Mapas | MapboxGL |
| Tipografía | Inter (Google Fonts) |

---

## Funcionalidades

### Lista de productos (CRUD)
Gestión completa de un catálogo de productos: crear, visualizar, editar y eliminar. El formulario valida campos obligatorios, detecta cambios antes de permitir guardar y diferencia entre modo alta y modo edición.

### Calendario de eventos
Calendario mensual interactivo con FullCalendar. Permite crear eventos con título, fecha y hora de inicio y fin, ubicación y descripción. Los eventos se pueden editar y eliminar tanto desde el calendario como desde la lista inferior.

### Gráficos de ventas
Visualización de datos de ventas en tres formatos: gráfico de barras, gráfico de pastel y tabla de datos. Cada visualización ocupa su propia sección en pantalla. Los colores se generan dinámicamente y el tooltip del pastel se posiciona junto al cursor.

### Mapa de ubicaciones (MapboxGL)
Mapa interactivo centrado en Barcelona con ubicaciones predefinidas de tiendas. Al hacer clic en el mapa se añade un nuevo marcador con geocodificación inversa (nombre de lugar automático), se guarda en base de datos y aparece en la lista lateral. Los marcadores guardados se pueden eliminar con el botón ✕.

---

## Requisitos previos

- **Node.js** v18 o superior
- **Angular CLI**: `npm install -g @angular/cli`
- **XAMPP** con MySQL activo en el puerto 3306

---

## Puesta en marcha

### 1. Base de datos

1. Iniciar XAMPP y arrancar el servicio MySQL
2. Abrir phpMyAdmin en `http://localhost/phpmyadmin`
3. Crear una base de datos llamada `tienda`
4. Importar el archivo `tienda.sql` incluido en la raíz del repositorio

### 2. Backend

```bash
cd improcode-backend
npm install
npx nodemon src/index.ts
```

El servidor arrancará en `http://localhost:4000`.

### 3. Frontend

```bash
cd improcode-frontend
npm install
ng serve
```

La aplicación estará disponible en `http://localhost:4200`.

---

## Variables de entorno

El backend lee un archivo `.env` en `improcode-backend/`. Crear el archivo con este contenido:

```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_NAME=tienda
```

> La instalación por defecto de XAMPP usa `root` sin contraseña. Si tu configuración es diferente, añade `DB_PASSWORD=tu_contraseña`.

---

## Estructura del proyecto

```
Gustavo-Mujica-Sprint-8-Angular/
├── tienda.sql                  # Volcado completo de la base de datos
├── improcode-backend/          # API REST
│   └── src/
│       ├── index.ts            # Punto de entrada
│       ├── routes/             # Rutas: productos, calendario, marcadores, gráficos
│       ├── controllers/        # Lógica de negocio
│       ├── models/             # Consultas a base de datos
│       └── db/
│           └── connection.ts   # Conexión MySQL con mysql2
└── improcode-frontend/         # SPA Angular 18
    └── src/app/
        ├── components/         # Navbar, lista de productos, formulario agregar/editar
        ├── sitios/             # Calendario, gráficos, mapas
        ├── servicios/          # Servicios HTTP por módulo
        └── interfaces/         # Tipos TypeScript
```

---

## API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/productos` | Obtener todos los productos |
| POST | `/api/productos` | Crear producto |
| PUT | `/api/productos/:id` | Actualizar producto |
| DELETE | `/api/productos/:id` | Eliminar producto |
| GET | `/api/calendario` | Obtener eventos |
| POST | `/api/calendario` | Crear evento |
| PUT | `/api/calendario/:id` | Actualizar evento |
| DELETE | `/api/calendario/:id` | Eliminar evento |
| GET | `/api/marcadores` | Obtener marcadores guardados |
| POST | `/api/marcadores` | Guardar marcador |
| DELETE | `/api/marcadores/:id` | Eliminar marcador |
| GET | `/api/graficos` | Obtener datos de ventas |


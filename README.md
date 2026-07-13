# ImproCode — Panel de Gestión Empresarial

Aplicación full-stack construida con **Angular 18** y **Node.js/Express** que simula el panel interno de una empresa: gestión de productos, agenda de eventos, visualización de ventas y mapa de ubicaciones de tiendas.

Es el sprint más completo del curso en términos de arquitectura — cuatro módulos independientes, cada uno con su propia librería especializada, todos conectados a una API REST propia con base de datos MySQL.

## Demo

Esta aplicación no tiene demo desplegada. Tiempo después del desarrollo original, intenté migrarla a la nube: **Railway** para el backend (una plataforma que permite hostear aplicaciones Node.js directamente desde GitHub) y **Aiven** para la base de datos MySQL (un servicio gestionado en la nube con capa gratuita).

En el proceso, Railway eliminó su plan gratuito, Aiven mostraba problemas de compatibilidad de cliente MySQL, y cada paso me alejaba más del ejercicio en sí. Y sobre todo — un panel de gestión empresarial con base de datos propia no es una app que deba vivir en un servidor de hobby con recursos limitados. Eso más que una demo del ejercicio habría sido un ejercicio diferente. Innecesario para la documentación de mi aprendizaje real al momento de terminarlo originalmente.

Decidí preservar el ejercicio tal como es: completo, con API REST propia, base de datos real y cuatro módulos independientes funcionando. Siguiendo los pasos de instalación de abajo, corre en local en menos de cinco minutos.

## Características

- **CRUD de productos**: listado, alta, edición y eliminación con formulario reactivo. El botón de guardar solo se activa cuando hay cambios reales — no antes.
- **Calendario de eventos** con FullCalendar: vista mensual interactiva, creación y edición de eventos con fecha, hora, ubicación y descripción.
- **Gráficos de ventas** con Chart.js: barras, pastel y tabla, cada uno en su propia pantalla. Los colores se generan dinámicamente en cada carga.
- **Mapa interactivo** con MapboxGL: ubicaciones predefinidas de tiendas en Barcelona. Al hacer clic en el mapa, el marcador obtiene su nombre automáticamente por geocodificación inversa y se guarda en base de datos. Los marcadores guardados se pueden eliminar.

## Tecnologías

- **Frontend**: Angular 18 standalone, Bootstrap 5, TypeScript, tipografía Inter
- **Backend**: Node.js, Express, TypeScript
- **Base de datos**: MySQL (XAMPP)
- **Librerías**: FullCalendar · Chart.js · MapboxGL

## Requisitos previos

- Node.js v18 o superior
- Angular CLI: `npm install -g @angular/cli`
- XAMPP con MySQL activo en el puerto 3306

## Puesta en marcha

### 1. Base de datos

1. Iniciar XAMPP y arrancar MySQL
2. Abrir phpMyAdmin en `http://localhost/phpmyadmin`
3. Crear una base de datos llamada `tienda`
4. Importar el archivo `tienda.sql` incluido en la raíz del repositorio

### 2. Backend

Crear un archivo `.env` en `improcode-backend/` con este contenido:

```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_NAME=tienda
```

> La instalación por defecto de XAMPP usa `root` sin contraseña. Si tu configuración es diferente, añade `DB_PASSWORD=tu_contraseña`.

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

## Estructura del proyecto

```
Gustavo-Mujica-Sprint-8-Angular/
├── tienda.sql                  # Volcado completo de la base de datos
├── improcode-backend/          # API REST
│   └── src/
│       ├── index.ts            # Punto de entrada
│       ├── routes/             # Rutas por módulo
│       ├── controllers/        # Lógica de negocio
│       ├── models/             # Consultas a base de datos
│       └── db/connection.ts    # Pool de conexiones MySQL
└── improcode-frontend/         # SPA Angular 18
    └── src/app/
        ├── components/         # Navbar, lista de productos, formulario
        ├── sitios/             # Calendario, gráficos, mapas
        ├── servicios/          # Servicios HTTP por módulo
        └── interfaces/         # Tipos TypeScript
```

## API REST

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET / POST | `/api/productos` | Listar o crear productos |
| PUT / DELETE | `/api/productos/:id` | Editar o eliminar producto |
| GET / POST | `/api/calendario` | Listar o crear eventos |
| PUT / DELETE | `/api/calendario/:id` | Editar o eliminar evento |
| GET / POST | `/api/marcadores` | Listar o guardar marcadores |
| DELETE | `/api/marcadores/:id` | Eliminar marcador |
| GET | `/api/graficos` | Datos de ventas para los gráficos |


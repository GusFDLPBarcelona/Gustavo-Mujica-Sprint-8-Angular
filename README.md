# Gustavo-Mujica-Sprint-8-Angular

# ImprocodeFrontend

Proyecto generado con angular/cli.

# Pruebas con CRUD, MapBox, FullCalendar y Chart.js.


## Descripción 📄

Este repositorio contiene los recursos de diferentes aplicaciones web para realizar pruebas con tecnologías como CRUD, MapBox, FullCalendar y Chart.js.



## Características ✨

- **Crear productos**: Crear productos con nombre, precio y descripción. Después de crear un producto, se puede editar o eliminar.
- **Guardar informacion en base de datos**: Guardar la informacion en la base de datos.
- **Buscar sitios en Mapbox**: Buscar sitios en Mapbox y mostrarlos en el mapa. Después de buscar un sitio, se puede guardar en la base de datos. y enseñar en por categorias.
- **Usar FullCalendar**: Se puede crear eventos en FullCalendar y guardarlos en la base de datos.


## Tecnologías Utilizadas 💻

- TypeScript
- HTML5
- SCSS 
- [Angular CLI](https://github.com/angular/angular-cli) version 17.0.5.
- [MapBox](https://www.mapbox.com/)
- [FullCalendar](https://fullcalendar.io/)
- [Chart.js](https://www.chartjs.org/)

## Requisitos 📋

- Node.js y npm instalados en tu sistema. Puedes descargarlos desde [nodejs.org](https://nodejs.org/).
- Angular CLI instalado globalmente. Puedes instalarlo con el siguiente comando:

```bash
npm install -g @angular/cli
```

## Instalación 🛠️

1. Clona el repositorio:

```bash
git clone https://github.com/GusFDLPBarcelona/Gustavo-Mujica-Sprint-8-Angular.git
```

2. Ingresa al directorio del proyecto:

```bash
cd gustavo-mujica-sprint-8-angular

cd improcode-frontend

3. Instala las dependencias:

```bash
npm install `
```
4. Levanta el servidor(Abrimos nuevo terminal):

```bash
npm start

cd improcode-backend
```
Instala las dependencias:

```bash
npm install
```
5. Tienes que entrar en xampp y arrancar el servidor mysql.

6. Tienes que crear una base de datos en mysql Workbench con el nombre de "tienda".

7. Tienes que importar el archivo tienda.sql que esta en la carpeta gustavo-mujica-sprint-8-angular.

8. Levanta el servidor en la carpeta improcode-backend:

```bash 
nodemon dist/index.js
```

Puerto de escucha frontend: http://localhost:4200
Puerto de escucha backend: http://localhost:4000


## Ejecución ▶️

Ejecuta la aplicación con el siguiente comando en terminal de front( en terminal con cd improcode-frontend):

```bash
ng serve -o
```

Para usar MapBox tienes que conseguir un 'token,' (puedes generarlo en la web de MApBox.) y luego tienes que ponerlo en en la carpeta environments en el archivo environments.ts (src/environments/environments.ts en la línea mapboxToken: '',).

## Uso 🚀

- CRUD: Crear, ver, editar y eliminar productos.
- MapBox: Buscar sitios, revisitarlos, conocer su latitud y longitud en el mapa, y guardarlos en la base de datos.
- FullCalendar: Crear eventos, editarlos, guardarlos en la base de datos y eliminarlos.
- Chart.js: Mostrar gráficos de barras con datos guardados en la base de datos.

Tecnologías y dependencias que puedes instalar desde el terminal de tu editor:

Angular 18
HTML 5
Css
Typescript
NodeJs
Express
Mapbox
ChartsJs
Full Calendar
Bootstrap
JQuery

Puedes pegar esta linea en el bash: 
npm i @angular/latest mapbox-gl chart.js fullcalendar bootstrap jquery mysql2 express
```
Necesitas instalar TypeScript como una dependencia de desarrollo en tu proyecto.

Para iniciarlo usa npx tsc --init

Esto generará el archivo tsconfig.json con las configuraciones necesarias para compilar tus archivos TypeScript a JavaScrip, todo ello necesario para que la aplicación se inicie.


Instalaciones adicionales:

MySql2
MySql Workbench
Xammp
Postman
---------------------------------------------------------------------------------------------------------









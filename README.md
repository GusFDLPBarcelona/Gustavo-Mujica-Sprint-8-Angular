# Gustavo-Mujica-Sprint-8-Angular

# Improcode -  IT Academy.

Proyecto generado con @angular/cli.

# Pruebas con CRUD, MapBox, FullCalendar y Chart.js.

Este repositorio contiene los recursos de diferentes aplicaciones web para realizar pruebas de operaciones CRUD ( Create, Read, Update, Delete) con tecnologías como MapBox, FullCalendar y Chart.js.

## Tecnologías Utilizadas 💻

- TypeScript
- HTML5
- CSS 
- Bootstrap

- [Angular CLI](https://github.com/angular/angular-cli version 18.0.2)
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

6. Tienes que crear una base de datos en mysql Workbench con el nombre "tienda".

7. Tienes que importar el archivo tienda.sql que está en la carpeta gustavo-mujica-sprint-8-angular.

8. Levanta el servidor en el terminal de tu editor con cd en improcode-backend:

```bash 
nodemon dist/index.js
```

- Puerto de escucha frontend: http://localhost:4200
- Puerto de escucha backend: http://localhost:4000/api


## Ejecución ▶️

Ejecuta la aplicación con el siguiente comando en el terminal de tu editor con cd en improcode-frontend:

```bash
ng serve -o
```

Para usar MapBox tienes que conseguir un 'token,' (puedes generarlo en la web de MApBox.) y luego tienes que ponerlo en en la carpeta environments en el archivo environments.ts (src/environments/environments.ts en la línea mapboxToken: '',).

## Uso 🚀

- CRUD: Crear, ver, editar y eliminar productos.
- MapBox: Buscar sitios, revisitarlos, conocer su latitud y longitud en el mapa, y guardarlos en la base de datos.
- FullCalendar: Crear eventos, editarlos, guardarlos en la base de datos y eliminarlos.
- Chart.js: Mostrar gráficos de barras con datos guardados en la base de datos.

Tecnologías y dependencias necesarias. Las que debes instalar, puedes hacerlo desde la terminal de tu editor de código:

-Angular 18
-HTML 5
-Css
-Typescript
-NodeJs
-Express
-Mapbox
-ChartsJs
-Full Calendar
-Bootstrap
-JQuery

-Puedes pegar esta linea en el bash: 
npm i @angular/latest mapbox-gl chart.js fullcalendar bootstrap jquery mysql2 express
```
Necesitas instalar TypeScript como una dependencia de desarrollo en tu proyecto.

Para instalarlo: npm i typescript --save-dev

Para iniciarlo usa npx tsc --init

Esto generará el archivo tsconfig.json con las configuraciones necesarias para compilar tus archivos TypeScript a JavaScrip, todo ello necesario para que la aplicación se inicie.

para compilar automáticamente: tsc --watch
Para compilar manualmente si no deseas instalar TypeScript globalmente: npx tsc 

Si no tienes TypesCript instalado globalmente, con el comando 'npx tsc tu_archivo.ts' te aseguras de compilar usando la versión del compilador definida en las dependencias de tu proyecto sin tener que preocuparte por instalaciones globales.

´´´´
Instalaciones adicionales para probar, habilitar y gestionar tus conexiones backend:

-MySql2
-MySql Workbench
-Xammp
-Postman

✨--------------------------------------------------------------------------------------------------------









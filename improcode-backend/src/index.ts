import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Importamos cors
import connection from './db/connection';
import routesProducto from './routes/producto';
import routesMarcador from './routes/marcadores';
import routesCalendario from './routes/calendario';

dotenv.config();

const app = express();

// Middlewares
app.use(cors()); // Habilitamos CORS
app.use(express.json()); // Para manejar JSON

// Rutas
app.use('/api/productos', routesProducto);
app.use('/api/marcadores', routesMarcador);
app.use('/api/calendario', routesCalendario);

// Conexión a la base de datos
connection.getConnection()
    .then(conn => {
        console.log('Conectado a la base de datos');
        conn.release();
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

// Iniciar el servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

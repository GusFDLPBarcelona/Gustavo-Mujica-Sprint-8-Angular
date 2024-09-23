import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import connection from './db/connection';
import routesProducto from './routes/producto';
import routesMarcador from './routes/marcadores';
import routesCalendario from './routes/calendario';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'f5a7c8b930dcdcc23a7f8c327ffb9d904f9cd0e171c62a28f0d5079632098f5e25ac9db50b7366cd7fc9be1c2f0d963a71a99f9836e4f93f',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use('/api/productos', routesProducto);
app.use('/api/marcadores', routesMarcador);
app.use('/api/calendario', routesCalendario);

connection.getConnection()
    .then(conn => {
        console.log('Conectado a la base de datos');
        conn.release();
    })
    .catch(err => {
        console.error('Error al conectar a la base de datos:', err);
    });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

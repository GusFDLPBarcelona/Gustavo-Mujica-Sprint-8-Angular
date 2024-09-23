import express, { Application, Request, Response } from 'express';
import routesProducto from '../routes/producto';
import routesMarcador from '../routes/marcadores';
import routesCalendario from '../routes/calendario'; // Rutas del calendario
import db from '../db/connection';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';

dotenv.config();

class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '4000';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbconnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }

    midlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Configuración de CORS
        this.app.use(cors({ origin: 'http://localhost:4200', credentials: true }));

        // Configuración de la sesión para calendario y otros servicios
        this.app.use(session({
            secret: process.env.SESSION_SECRET || 'your_session_secret',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false } // Cambia a true si usas HTTPS
        }));
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            });
        });

        // Rutas CRUD existentes
        this.app.use('/api/productos', routesProducto);
        this.app.use('/api/marcadores', routesMarcador);

        // Rutas del calendario
        this.app.use('/api/calendario', routesCalendario);
    }

    async dbconnect() {
        try {
            await db.query('SELECT 1');
            console.log('Base de datos conectada');
        } catch (error) {
            console.error('Error al conectar con la base de datos:', error);
        }
    }
}

export default Server;

import express, { Application, Request, Response } from 'express';
import routesProducto from '../routes/producto';
import routesMarcador from '../routes/marcadores';
import routesCalendario from '../routes/calendario';
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
        this.app.use(cors({ origin: 'http://localhost:4200/sitios/calendario', credentials: true }));
        this.app.use(session({
            secret: process.env.SESSION_SECRET || 'fallbackSecret',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        }));
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            });
        });

        this.app.use('/api/productos', routesProducto);
        this.app.use('/api/marcadores', routesMarcador);
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

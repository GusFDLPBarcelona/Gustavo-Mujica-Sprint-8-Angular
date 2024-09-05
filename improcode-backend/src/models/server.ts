import express, { Application, Request, Response } from 'express';
import routesProducto from '../routes/producto';
import db from '../db/connection';
import cors from 'cors';

class Server {
    private app: Application;
    private port: string;

    constructor() {

        this.app = express();
        this.port = process.env.PORT || '4001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbconnect();
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`)
        });
    }

    routes() {
        this.app.get('/', (req: Request, res: Response) => {
            res.json({
                msg: 'API Working'
            })
        })
        this.app.use('/api/productos', routesProducto)
    }

    midlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbconnect() {
        try {

            await db.authenticate();
            console.log('base conectada');

        } catch (error) {
            console.log(error);
            console.log('error al conectarse a la base de datos');
        }

    }
}
export default Server;
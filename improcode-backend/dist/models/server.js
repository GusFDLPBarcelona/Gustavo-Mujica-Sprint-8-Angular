"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producto_1 = __importDefault(require("../routes/producto"));
const marcadores_1 = __importDefault(require("../routes/marcadores"));
const calendario_1 = __importDefault(require("../routes/calendario")); // Rutas del calendario
const connection_1 = __importDefault(require("../db/connection"));
const cors_1 = __importDefault(require("cors"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
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
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        // Configuración de CORS
        this.app.use((0, cors_1.default)({ origin: 'http://localhost:4200', credentials: true }));
        // Configuración de la sesión para calendario y otros servicios
        this.app.use((0, express_session_1.default)({
            secret: process.env.SESSION_SECRET || 'your_session_secret',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false } // Cambia a true si usas HTTPS
        }));
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API Working'
            });
        });
        // Rutas CRUD existentes
        this.app.use('/api/productos', producto_1.default);
        this.app.use('/api/marcadores', marcadores_1.default);
        // Rutas del calendario
        this.app.use('/api/calendario', calendario_1.default);
    }
    async dbconnect() {
        try {
            await connection_1.default.query('SELECT 1');
            console.log('Base de datos conectada');
        }
        catch (error) {
            console.error('Error al conectar con la base de datos:', error);
        }
    }
}
exports.default = Server;

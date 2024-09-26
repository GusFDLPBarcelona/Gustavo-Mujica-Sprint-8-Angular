"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producto_1 = __importDefault(require("../routes/producto"));
const marcadores_1 = __importDefault(require("../routes/marcadores"));
const graficos_1 = __importDefault(require("../routes/graficos"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '4000';
        this.listen();
        this.midlewares();
        this.routes();
    }
    midlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({ origin: 'http://localhost:4200', credentials: true }));
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({ msg: 'API Working' });
        });
        this.app.use('/api/productos', producto_1.default);
        this.app.use('/api/marcadores', marcadores_1.default);
        this.app.use('/api/graficos', graficos_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicacion corriendo en el puerto ${this.port}`);
        });
    }
}
exports.default = Server;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("./db/connection"));
const producto_1 = __importDefault(require("./routes/producto"));
const marcadores_1 = __importDefault(require("./routes/marcadores"));
const calendario_1 = __importDefault(require("./routes/calendario"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/productos', producto_1.default);
app.use('/api/marcadores', marcadores_1.default);
app.use('/api/calendario', calendario_1.default);
connection_1.default.getConnection()
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

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const dotenv_1 = __importDefault(require("dotenv"));
const connection_1 = __importDefault(require("./db/connection"));
const producto_1 = __importDefault(require("./routes/producto"));
const marcadores_1 = __importDefault(require("./routes/marcadores"));
const calendario_1 = __importDefault(require("./routes/calendario"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'f5a7c8b930dcdcc23a7f8c327ffb9d904f9cd0e171c62a28f0d5079632098f5e25ac9db50b7366cd7fc9be1c2f0d963a71a99f9836e4f93f',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
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

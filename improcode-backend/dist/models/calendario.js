"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvento = exports.updateEvento = exports.createEvento = exports.getAllEventos = void 0;
const connection_1 = __importDefault(require("../db/connection")); // Importamos la conexión a la base de datos
// Obtener todos los eventos
const getAllEventos = async () => {
    const [rows] = await connection_1.default.query(`SELECT * FROM eventos`);
    return rows;
};
exports.getAllEventos = getAllEventos;
// Crear un nuevo evento
const createEvento = async (evento) => {
    const { summary, location, description, start, end } = evento;
    const [result] = await connection_1.default.query(`INSERT INTO eventos (summary, location, description, start, end) VALUES (?, ?, ?, ?, ?)`, [summary, location, description, start, end]);
    return result.insertId;
};
exports.createEvento = createEvento;
// Actualizar un evento existente por su ID
const updateEvento = async (id, evento) => {
    const { summary, location, description, start, end } = evento;
    const [result] = await connection_1.default.query(`UPDATE eventos SET summary = ?, location = ?, description = ?, start = ?, end = ? WHERE id = ?`, [summary, location, description, start, end, id]);
    return result.affectedRows > 0; // Devuelve true si se actualizó
};
exports.updateEvento = updateEvento;
// Eliminar un evento por su ID
const deleteEvento = async (id) => {
    const [result] = await connection_1.default.query(`DELETE FROM eventos WHERE id = ?`, [id]);
    return result.affectedRows > 0; // Devuelve true si se eliminó
};
exports.deleteEvento = deleteEvento;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvento = exports.updateEvento = exports.createEvento = exports.getEventos = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getEventos = async () => {
    const [rows] = await connection_1.default.query(`SELECT * FROM eventos`);
    return rows.map((evento) => (Object.assign(Object.assign({}, evento), { startDateTime: evento.startDateTime ? new Date(evento.startDateTime).toISOString() : null, endDateTime: evento.endDateTime ? new Date(evento.endDateTime).toISOString() : null })));
};
exports.getEventos = getEventos;
const createEvento = async (evento) => {
    const { summary, location, description, startDateTime, endDateTime } = evento;
    const [result] = await connection_1.default.query(`INSERT INTO eventos (summary, location, description, startDateTime, endDateTime) VALUES (?, ?, ?, ?, ?)`, [summary, location, description, startDateTime, endDateTime]);
    return result.insertId;
};
exports.createEvento = createEvento;
const updateEvento = async (id, evento) => {
    const { summary, location, description, startDateTime, endDateTime } = evento;
    const [result] = await connection_1.default.query(`UPDATE eventos SET summary = ?, location = ?, description = ?, startDateTime = ?, endDateTime = ? WHERE id = ?`, [summary, location, description, startDateTime, endDateTime, id]);
    return result.affectedRows > 0;
};
exports.updateEvento = updateEvento;
const deleteEvento = async (id) => {
    const [result] = await connection_1.default.query(`DELETE FROM eventos WHERE id = ?`, [id]);
    return result.affectedRows > 0;
};
exports.deleteEvento = deleteEvento;

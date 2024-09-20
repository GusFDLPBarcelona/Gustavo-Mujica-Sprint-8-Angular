"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const createEvent = async (summary, location, description, startDateTime, endDateTime) => {
    const [result] = await connection_1.default.query('INSERT INTO eventos (summary, location, description, startDateTime, endDateTime) VALUES (?, ?, ?, ?, ?)', [summary, location, description, startDateTime, endDateTime]);
    return result;
};
exports.createEvent = createEvent;
const getAllEvents = async () => {
    const [rows] = await connection_1.default.query('SELECT * FROM eventos');
    console.log('rows', rows);
    return rows;
};
exports.getAllEvents = getAllEvents;
const getEventById = async (id) => {
    const [rows] = await connection_1.default.query('SELECT * FROM eventos WHERE id = ?', [id]);
    if (rows.length === 0) {
        throw new Error('Evento no encontrado');
    }
    return rows[0];
};
exports.getEventById = getEventById;
const updateEvent = async (id, summary, location, description, startDateTime, endDateTime) => {
    const [result] = await connection_1.default.query('UPDATE eventos SET summary = ?, location = ?, description = ?, startDateTime = ?, endDateTime = ? WHERE id = ?', [summary, location, description, startDateTime, endDateTime, id]);
    return result;
};
exports.updateEvent = updateEvent;
const deleteEvent = async (id) => {
    const [result] = await connection_1.default.query('DELETE FROM eventos WHERE id = ?', [id]);
    return result;
};
exports.deleteEvent = deleteEvent;

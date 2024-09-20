"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMarker = exports.addMarker = exports.getMarkers = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getMarkers = async () => {
    const [rows] = await connection_1.default.query('SELECT * FROM marcadores');
    return rows;
};
exports.getMarkers = getMarkers;
const markerExists = async (latitude, longitude) => {
    const [rows] = await connection_1.default.query('SELECT COUNT(*) as count FROM marcadores WHERE latitude = ? AND longitude = ?', [latitude, longitude]);
    return rows[0].count > 0;
};
const addMarker = async (latitude, longitude, name) => {
    const exists = await markerExists(latitude, longitude);
    if (exists) {
        throw new Error('El marcador ya existe en la base de datos');
    }
    const [result] = await connection_1.default.query('INSERT INTO marcadores (latitude, longitude, name) VALUES (?, ?, ?)', [latitude, longitude, name]);
    return result;
};
exports.addMarker = addMarker;
const deleteMarker = async (id) => {
    const [result] = await connection_1.default.query('DELETE FROM marcadores WHERE id = ?', [id]);
    return result;
};
exports.deleteMarker = deleteMarker;

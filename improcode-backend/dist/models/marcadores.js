"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMarker = exports.addMarker = exports.getMarkers = void 0;
const connection_1 = __importDefault(require("../db/connection"));
// Obtener todos los marcadores
const getMarkers = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query('SELECT * FROM marcadores');
    return rows;
});
exports.getMarkers = getMarkers;
// Verificar si existe un marcador con las mismas coordenadas
const markerExists = (latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query('SELECT COUNT(*) as count FROM marcadores WHERE latitude = ? AND longitude = ?', [latitude, longitude]);
    return rows[0].count > 0;
});
const addMarker = (latitude, longitude, name) => __awaiter(void 0, void 0, void 0, function* () {
    // Verificar si el marcador ya existe
    const exists = yield markerExists(latitude, longitude);
    if (exists) {
        throw new Error('El marcador ya existe en la base de datos');
    }
    // Si no existe, insertar el nuevo marcador con el nombre
    const [result] = yield connection_1.default.query('INSERT INTO marcadores (latitude, longitude, name) VALUES (?, ?, ?)', [latitude, longitude, name]);
    return result;
});
exports.addMarker = addMarker;
// Eliminar marcador
const deleteMarker = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.query('DELETE FROM marcadores WHERE id = ?', [id]);
    return result;
});
exports.deleteMarker = deleteMarker;

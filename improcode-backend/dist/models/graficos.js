"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGrafico = exports.addGrafico = exports.getGraficos = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const getGraficos = async () => {
    const [rows] = await connection_1.default.query('SELECT * FROM graficos');
    return rows;
};
exports.getGraficos = getGraficos;
const addGrafico = async (producto, mes, anio, ventas) => {
    const [result] = await connection_1.default.query('INSERT INTO graficos (producto, mes, anio, ventas) VALUES (?, ?, ?, ?)', [producto, mes, anio, ventas]);
    return result;
};
exports.addGrafico = addGrafico;
const deleteGrafico = async (id) => {
    const [result] = await connection_1.default.query('DELETE FROM graficos WHERE id = ?', [id]);
    return result;
};
exports.deleteGrafico = deleteGrafico;

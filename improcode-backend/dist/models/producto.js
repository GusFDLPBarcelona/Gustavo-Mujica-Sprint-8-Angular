"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProducto = exports.updateProducto = exports.getProducto = exports.getProductos = exports.createProducto = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const createProducto = async (nombre, descripcion, talla, precio, stock) => {
    const [result] = await connection_1.default.query('INSERT INTO productos (nombre, descripcion, talla, precio, stock) VALUES (?, ?, ?, ?, ?)', [nombre, descripcion, talla, precio, stock]);
    return result;
};
exports.createProducto = createProducto;
const getProductos = async () => {
    const [rows] = await connection_1.default.query('SELECT * FROM productos');
    return rows;
};
exports.getProductos = getProductos;
const getProducto = async (id) => {
    const [rows] = await connection_1.default.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (rows.length === 0) {
        throw new Error('Producto no encontrado');
    }
    return rows[0];
};
exports.getProducto = getProducto;
const updateProducto = async (id, nombre, descripcion, talla, precio, stock) => {
    const [result] = await connection_1.default.query('UPDATE productos SET nombre = ?, descripcion = ?, talla = ?, precio = ?, stock = ? WHERE id = ?', [nombre, descripcion, talla, precio, stock, id]);
    return result;
};
exports.updateProducto = updateProducto;
const deleteProducto = async (id) => {
    const [result] = await connection_1.default.query('DELETE FROM productos WHERE id = ?', [id]);
    return result;
};
exports.deleteProducto = deleteProducto;

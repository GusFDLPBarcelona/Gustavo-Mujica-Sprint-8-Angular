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
exports.deleteProducto = exports.updateProducto = exports.getProducto = exports.getProductos = exports.createProducto = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const createProducto = (nombre, descripcion, talla, precio, stock) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.query('INSERT INTO productos (nombre, descripcion, talla, precio, stock) VALUES (?, ?, ?, ?, ?)', [nombre, descripcion, talla, precio, stock]);
    return result;
});
exports.createProducto = createProducto;
const getProductos = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query('SELECT * FROM productos');
    return rows;
});
exports.getProductos = getProductos;
const getProducto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query('SELECT * FROM productos WHERE id = ?', [id]);
    if (rows.length === 0) {
        throw new Error('Producto no encontrado');
    }
    return rows[0];
});
exports.getProducto = getProducto;
const updateProducto = (id, nombre, descripcion, talla, precio, stock) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.query('UPDATE productos SET nombre = ?, descripcion = ?, talla = ?, precio = ?, stock = ? WHERE id = ?', [nombre, descripcion, talla, precio, stock, id]);
    return result;
});
exports.updateProducto = updateProducto;
const deleteProducto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.query('DELETE FROM productos WHERE id = ?', [id]);
    return result;
});
exports.deleteProducto = deleteProducto;

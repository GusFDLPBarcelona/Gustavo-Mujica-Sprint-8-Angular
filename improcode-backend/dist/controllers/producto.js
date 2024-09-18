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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.postProduct = exports.getProducts = exports.getProduct = void 0;
const producto_1 = require("../models/producto");
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const producto = yield (0, producto_1.getProducto)(Number(id));
        res.json(producto);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});
exports.getProduct = getProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield (0, producto_1.getProductos)();
        res.json(productos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});
exports.getProducts = getProducts;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion, talla, precio, stock } = req.body;
    try {
        const result = yield (0, producto_1.createProducto)(nombre, descripcion, talla, Number(precio), Number(stock));
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});
exports.postProduct = postProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, descripcion, talla, precio, stock } = req.body;
    try {
        const productoExistente = yield (0, producto_1.getProducto)(Number(id));
        if (!productoExistente) {
            return res.status(404).json({
                msg: `No existe el producto con id ${id}`
            });
        }
        const result = yield (0, producto_1.updateProducto)(Number(id), nombre, descripcion, talla, Number(precio), Number(stock));
        res.json({
            msg: `El producto fue actualizado con éxito.`,
            result
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Ha ocurrido un error al actualizar el producto.`
        });
    }
});
exports.updateProduct = updateProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const result = yield (0, producto_1.deleteProducto)(Number(id));
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});
exports.deleteProduct = deleteProduct;

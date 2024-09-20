"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.postProduct = exports.getProducts = exports.getProduct = void 0;
const producto_1 = require("../models/producto");
const getProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await (0, producto_1.getProducto)(Number(id));
        res.json(producto);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};
exports.getProduct = getProduct;
const getProducts = async (req, res) => {
    try {
        const productos = await (0, producto_1.getProductos)();
        res.json(productos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};
exports.getProducts = getProducts;
const postProduct = async (req, res) => {
    const { nombre, descripcion, talla, precio, stock } = req.body;
    try {
        const result = await (0, producto_1.createProducto)(nombre, descripcion, talla, Number(precio), Number(stock));
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};
exports.postProduct = postProduct;
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, talla, precio, stock } = req.body;
    try {
        const productoExistente = await (0, producto_1.getProducto)(Number(id));
        if (!productoExistente) {
            return res.status(404).json({
                msg: `No existe el producto con id ${id}`
            });
        }
        const result = await (0, producto_1.updateProducto)(Number(id), nombre, descripcion, talla, Number(precio), Number(stock));
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
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await (0, producto_1.deleteProducto)(Number(id));
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};
exports.deleteProduct = deleteProduct;

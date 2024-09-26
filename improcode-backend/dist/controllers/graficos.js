"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeGrafico = exports.createGrafico = exports.getAllGraficos = void 0;
const graficos_1 = require("../models/graficos");
const getAllGraficos = async (req, res) => {
    try {
        const graficos = await (0, graficos_1.getGraficos)();
        res.json(graficos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los gráficos' });
    }
};
exports.getAllGraficos = getAllGraficos;
const createGrafico = async (req, res) => {
    const { producto, mes, anio, ventas } = req.body;
    try {
        const result = await (0, graficos_1.addGrafico)(producto, Number(mes), Number(anio), Number(ventas));
        res.json({ message: 'Gráfico añadido', result });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al añadir el gráfico' });
    }
};
exports.createGrafico = createGrafico;
const removeGrafico = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, graficos_1.deleteGrafico)(Number(id));
        res.json({ message: 'Gráfico eliminado' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el gráfico' });
    }
};
exports.removeGrafico = removeGrafico;

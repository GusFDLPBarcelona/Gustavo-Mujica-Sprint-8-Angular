"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMarker = exports.createMarker = exports.getAllMarkers = void 0;
const marcadores_1 = require("../models/marcadores");
const getAllMarkers = async (req, res) => {
    try {
        const markers = await (0, marcadores_1.getMarkers)();
        res.json(markers);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los marcadores' });
    }
};
exports.getAllMarkers = getAllMarkers;
const createMarker = async (req, res) => {
    const { latitude, longitude, name } = req.body;
    try {
        const result = await (0, marcadores_1.addMarker)(Number(latitude), Number(longitude), name || '');
        res.json({ message: 'Marcador añadido', result });
    }
    catch (error) {
        if (error.message === 'El marcador ya existe en la base de datos') {
            res.status(400).json({ error: 'El marcador ya existe en la base de datos con esas coordenadas.' });
        }
        else {
            res.status(500).json({ error: 'Error al añadir el marcador' });
        }
    }
};
exports.createMarker = createMarker;
const removeMarker = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, marcadores_1.deleteMarker)(Number(id));
        res.json({ message: 'Marcador eliminado' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el marcador' });
    }
};
exports.removeMarker = removeMarker;

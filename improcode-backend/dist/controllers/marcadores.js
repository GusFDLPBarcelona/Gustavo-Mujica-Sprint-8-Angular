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
exports.removeMarker = exports.createMarker = exports.getAllMarkers = void 0;
const marcadores_1 = require("../models/marcadores");
const getAllMarkers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const markers = yield (0, marcadores_1.getMarkers)();
        res.json(markers);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los marcadores' });
    }
});
exports.getAllMarkers = getAllMarkers;
const createMarker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { latitude, longitude, name } = req.body; // Obtener el nombre además de latitud y longitud
    try {
        const result = yield (0, marcadores_1.addMarker)(Number(latitude), Number(longitude), name || '' // Si no se pasa un nombre, usar un valor vacío
        );
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
});
exports.createMarker = createMarker;
const removeMarker = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, marcadores_1.deleteMarker)(Number(id));
        res.json({ message: 'Marcador eliminado' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el marcador' });
    }
});
exports.removeMarker = removeMarker;

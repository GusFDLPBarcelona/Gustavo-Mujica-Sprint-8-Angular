"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvento = exports.updateEvento = exports.createEvento = exports.getEventos = void 0;
const calendario_1 = require("../models/calendario");
const getEventos = async (req, res) => {
    try {
        const eventos = await (0, calendario_1.getEventos)();
        res.json(eventos);
    }
    catch (error) {
        console.error('Error al obtener eventos', error);
        res.status(500).json({ message: 'Error al obtener eventos' });
    }
};
exports.getEventos = getEventos;
const createEvento = async (req, res) => {
    try {
        const eventoId = await (0, calendario_1.createEvento)(req.body);
        res.status(201).json({ message: 'Evento creado', id: eventoId });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el evento' });
    }
};
exports.createEvento = createEvento;
const updateEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const updated = await (0, calendario_1.updateEvento)(id, req.body);
        if (updated) {
            res.json({ message: 'Evento actualizado' });
        }
        else {
            res.status(404).json({ message: 'Evento no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el evento' });
    }
};
exports.updateEvento = updateEvento;
const deleteEvento = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await (0, calendario_1.deleteEvento)(id);
        if (deleted) {
            res.json({ message: 'Evento eliminado' });
        }
        else {
            res.status(404).json({ message: 'Evento no encontrado' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el evento' });
    }
};
exports.deleteEvento = deleteEvento;

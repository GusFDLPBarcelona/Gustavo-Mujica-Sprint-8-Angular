import { Request, Response } from 'express';
import { getAllEventos, createEvento as createEventoModel, updateEvento as updateEventoModel, deleteEvento as deleteEventoModel } from '../models/calendario';

// Obtener todos los eventos
export const getEventos = async (req: Request, res: Response) => {
    try {
        const eventos = await getAllEventos();
        res.json(eventos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los eventos' });
    }
};

// Crear un nuevo evento
export const createEvento = async (req: Request, res: Response) => {
    try {
        const eventoId = await createEventoModel(req.body);
        res.status(201).json({ message: 'Evento creado', id: eventoId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el evento' });
    }
};

// Actualizar un evento por ID
export const updateEvento = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const updated = await updateEventoModel(id, req.body);
        if (updated) {
            res.json({ message: 'Evento actualizado' });
        } else {
            res.status(404).json({ message: 'Evento no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el evento' });
    }
};

// Eliminar un evento por ID
export const deleteEvento = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const deleted = await deleteEventoModel(id);
        if (deleted) {
            res.json({ message: 'Evento eliminado' });
        } else {
            res.status(404).json({ message: 'Evento no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar el evento' });
    }
};

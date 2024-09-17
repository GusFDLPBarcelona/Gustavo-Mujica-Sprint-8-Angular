import { Request, Response } from 'express';
import { getMarkers, addMarker, deleteMarker } from '../models/marcadores';


export const getAllMarkers = async (req: Request, res: Response) => {
    try {
        const markers = await getMarkers();
        res.json(markers);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los marcadores' });
    }
};


export const createMarker = async (req: Request, res: Response) => {
    const { latitude, longitude, name } = req.body;  // Obtener el nombre además de latitud y longitud
    try {
        const result = await addMarker(
            Number(latitude),
            Number(longitude),
            name || ''  // Si no se pasa un nombre, usar un valor vacío
        );
        res.json({ message: 'Marcador añadido', result });
    } catch (error: any) {
        if (error.message === 'El marcador ya existe en la base de datos') {
            res.status(400).json({ error: 'El marcador ya existe en la base de datos con esas coordenadas.' });
        } else {
            res.status(500).json({ error: 'Error al añadir el marcador' });
        }
    }
};


export const removeMarker = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteMarker(Number(id));
        res.json({ message: 'Marcador eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el marcador' });
    }
};

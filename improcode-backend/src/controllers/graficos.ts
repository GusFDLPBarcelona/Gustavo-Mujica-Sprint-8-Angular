import { Request, Response } from 'express';
import { getGraficos, addGrafico, deleteGrafico } from '../models/graficos';


export const getAllGraficos = async (req: Request, res: Response) => {
    try {
        const graficos = await getGraficos();
        res.json(graficos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los gráficos' });
    }
};

export const createGrafico = async (req: Request, res: Response) => {
    const { producto, mes, anio, ventas } = req.body;

    try {
        const result = await addGrafico(producto, Number(mes), Number(anio), Number(ventas));
        res.json({ message: 'Gráfico añadido', result });
    } catch (error) {
        res.status(500).json({ error: 'Error al añadir el gráfico' });
    }
};

export const removeGrafico = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await deleteGrafico(Number(id));
        res.json({ message: 'Gráfico eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el gráfico' });
    }
};

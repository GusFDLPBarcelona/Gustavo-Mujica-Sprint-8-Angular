import { google } from "googleapis";
import { Request, Response } from "express";

const calendar = google.calendar('v3');

const apiKey = process.env.AIzaSyA6u0yN3fc5pTvJp_bTWBwsVNsr6XJegaw;

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { summary, location, description, startDateTime, endDateTime } = req.body;

        const event = {
            summary,
            location,
            description,
            start: {
                dateTime: startDateTime,
                timeZone: 'Europa/MAdrid',
            },
            end: {
                dateTime: endDateTime,
                timeZone: 'Europa/MAdrid',
            },
        };

        const response = await calendar.events.insert({
            key: apiKey,
            calendarId: 'Agenda de Eventos',
            requestBody: event,
        });

        res.status(200).json({
            message: 'Evento creado con éxito',
            eventId: response.data.id,
        });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error al crear el evento',
                error: error.message,
            });
        } else {
            res.status(500).json({
                message: 'Error desconocido',
            });
        }
    }
};

export const getAllEvents = async (req: Request, res: Response) => {
    try {
        const response = await calendar.events.list({
            key: apiKey,
            calendarId: 'primary',
        });

        res.status(200).json(response.data.items);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error al obtener los Eventos',
                error: error.message,
            });
        } else {
            res.status(500).json({
                message: 'Error desconocido',
            });
        }
    }
};

export const getEventById = async (req: Request, res: Response) => {
    const { eventId } = req.params;

    try {
        const response = await calendar.events.get({
            key: apiKey,
            calendarId: 'primary',
            eventId: eventId,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error al obtener el Eventos seleccionado',
                error: error.message,
            });
        } else {
            res.status(500).json({
                message: 'Error desconocido',
            });
        }
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const { summary, location, description, startDateTime, endDateTime } = req.body;

    try {
        const event = {
            summary,
            location,
            description,
            start: {
                dateTime: startDateTime,
                timeZone: 'America/New_York',
            },
            end: {
                dateTime: endDateTime,
                timeZone: 'America/New_York',
            },
        };

        const response = await calendar.events.update({
            key: apiKey,
            calendarId: 'primary',
            eventId: eventId,  // ID del evento que se quiere actualizar
            requestBody: event,
        });

        res.status(200).json({
            message: 'Evento actualizado con éxito',
            eventId: response.data.id,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error al editar el Evento seleccionado',
                error: error.message,
            });
        } else {
            res.status(500).json({
                message: 'Error desconocido',
            });
        }
    }
};


export const deleteEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params;

    try {
        await calendar.events.delete({
            key: apiKey,
            calendarId: 'primary',
            eventId: eventId,
        });

        res.status(200).json({
            message: 'Evento eliminado con éxito',
        });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error al obtener el Eventos seleccionado',
                error: error.message,
            });
        } else {
            res.status(500).json({
                message: 'Error desconocido',
            });
        }
    }
};


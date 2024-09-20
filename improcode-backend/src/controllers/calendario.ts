import { google } from "googleapis";
import { Request, Response } from "express";

const calendar = google.calendar('v3');
const apiKey = process.env.GOOGLE_API_KEY;

export const createEvent = async (req: Request, res: Response) => {
    try {
        const { summary, location, description, startDateTime, endDateTime } = req.body;

        const event = {
            summary,
            location,
            description,
            start: {
                dateTime: startDateTime,
                timeZone: 'Europa/Madrid',
            },
            end: {
                dateTime: endDateTime,
                timeZone: 'Europa/Madrid',
            },
        };

        const response = await calendar.events.insert({
            key: apiKey,
            calendarId: 'primary',
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
    console.log('getAllEvents');
    try {
        const response = await calendar.events.list({
            key: apiKey,
            calendarId: 'primary',
        });

        res.status(200).json(response.data.items);
    } catch (error) {
        console.error(error);
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

        res.status(200).json(response.data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error al obtener el Evento seleccionado',
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
            eventId: eventId,
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
                message: 'Error al eliminar el Evento seleccionado',
                error: error.message,
            });
        } else {
            res.status(500).json({
                message: 'Error desconocido',
            });
        }
    }
};

import { Request, Response } from 'express';
import { google } from 'googleapis';
import connection from '../db/connection';

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'http://localhost:4000/api/calendario/oauth2callback'
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

export const getAuthUrl = (req: Request, res: Response) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar']
    });
    res.redirect(authUrl);
};

export const oauth2callback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        req.session.token = tokens;
        res.redirect('http://localhost:4200/sitios/calendario');
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el token de Google', error: (error as Error).message });
    }
};

export const createEvent = async (req: Request, res: Response) => {
    const { summary, location, description, startDateTime, endDateTime } = req.body;

    if (!req.session.token) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    oauth2Client.setCredentials(req.session.token);

    const event = {
        summary,
        location,
        description,
        start: { dateTime: startDateTime, timeZone: 'Europa/Madrid' },
        end: { dateTime: endDateTime, timeZone: 'Europa/Madrid' }
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            requestBody: event
        });

        const googleEventId = response.data.id;

        const query = 'INSERT INTO events (summary, location, description, startDateTime, endDateTime, googleEventId) VALUES (?, ?, ?, ?, ?, ?)';
        await connection.query(query, [summary, location, description, startDateTime, endDateTime, googleEventId]);

        res.status(200).json({ message: 'Evento creado con éxito', googleEventId });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el evento en Google Calendar o MySQL', error: (error as Error).message });
    }
};

export const getAllEvents = async (req: Request, res: Response) => {
    if (!req.session.token) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    try {
        const [rows] = await connection.query('SELECT * FROM events');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los eventos desde MySQL', error: (error as Error).message });
    }
};

export const getEventById = async (req: Request, res: Response) => {
    const { eventId } = req.params;

    if (!req.session.token) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    try {
        const [rows]: any[] = await connection.query('SELECT * FROM events WHERE googleEventId = ?', [eventId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el evento desde MySQL', error: (error as Error).message });
    }
};

export const updateEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params;
    const { summary, location, description, startDateTime, endDateTime } = req.body;

    if (!req.session.token) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    oauth2Client.setCredentials(req.session.token);

    const event = {
        summary,
        location,
        description,
        start: { dateTime: startDateTime, timeZone: 'Europa/Madrid' },
        end: { dateTime: endDateTime, timeZone: 'Europa/Madrid' }
    };

    try {
        await calendar.events.update({
            calendarId: 'primary',
            eventId: eventId,
            requestBody: event
        });

        const query = 'UPDATE events SET summary = ?, location = ?, description = ?, startDateTime = ?, endDateTime = ? WHERE googleEventId = ?';
        await connection.query(query, [summary, location, description, startDateTime, endDateTime, eventId]);

        res.status(200).json({ message: 'Evento actualizado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el evento en Google Calendar o MySQL', error: (error as Error).message });
    }
};

export const deleteEvent = async (req: Request, res: Response) => {
    const { eventId } = req.params;

    if (!req.session.token) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    oauth2Client.setCredentials(req.session.token);

    try {
        await calendar.events.delete({
            calendarId: 'primary',
            eventId: eventId
        });

        const query = 'DELETE FROM events WHERE googleEventId = ?';
        await connection.query(query, [eventId]);

        res.status(200).json({ message: 'Evento eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el evento en Google Calendar o MySQL', error: (error as Error).message });
    }
};

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = exports.oauth2callback = exports.getAuthUrl = void 0;
const googleapis_1 = require("googleapis");
const connection_1 = __importDefault(require("../db/connection"));
const oauth2Client = new googleapis_1.google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET, 'http://localhost:4000/api/calendario/oauth2callback');
const calendar = googleapis_1.google.calendar({ version: 'v3', auth: oauth2Client });
const getAuthUrl = (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar']
    });
    res.redirect(authUrl);
};
exports.getAuthUrl = getAuthUrl;
const oauth2callback = async (req, res) => {
    const code = req.query.code;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        req.session.token = tokens;
        res.redirect('http://localhost:4200/sitios/calendario');
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el token de Google', error: error.message });
    }
};
exports.oauth2callback = oauth2callback;
const createEvent = async (req, res) => {
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
        await connection_1.default.query(query, [summary, location, description, startDateTime, endDateTime, googleEventId]);
        res.status(200).json({ message: 'Evento creado con éxito', googleEventId });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el evento en Google Calendar o MySQL', error: error.message });
    }
};
exports.createEvent = createEvent;
const getAllEvents = async (req, res) => {
    if (!req.session.token) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    try {
        const [rows] = await connection_1.default.query('SELECT * FROM events');
        res.status(200).json(rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los eventos desde MySQL', error: error.message });
    }
};
exports.getAllEvents = getAllEvents;
const getEventById = async (req, res) => {
    const { eventId } = req.params;
    if (!req.session.token) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    try {
        const [rows] = await connection_1.default.query('SELECT * FROM events WHERE googleEventId = ?', [eventId]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Evento no encontrado' });
        }
        res.status(200).json(rows[0]);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el evento desde MySQL', error: error.message });
    }
};
exports.getEventById = getEventById;
const updateEvent = async (req, res) => {
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
        await connection_1.default.query(query, [summary, location, description, startDateTime, endDateTime, eventId]);
        res.status(200).json({ message: 'Evento actualizado con éxito' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el evento en Google Calendar o MySQL', error: error.message });
    }
};
exports.updateEvent = updateEvent;
const deleteEvent = async (req, res) => {
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
        await connection_1.default.query(query, [eventId]);
        res.status(200).json({ message: 'Evento eliminado con éxito' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el evento en Google Calendar o MySQL', error: error.message });
    }
};
exports.deleteEvent = deleteEvent;

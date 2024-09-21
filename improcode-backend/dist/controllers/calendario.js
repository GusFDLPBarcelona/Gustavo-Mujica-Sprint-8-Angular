"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = exports.oauth2callback = exports.checkAuth = exports.getAuthUrl = void 0;
const googleapis_1 = require("googleapis");
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
const checkAuth = (req, res) => {
    if (req.session && req.session.token) {
        res.status(200).json({ authenticated: true });
    }
    else {
        res.status(401).json({ authenticated: false });
    }
};
exports.checkAuth = checkAuth;
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
        res.status(200).json({ message: 'Evento creado con éxito', eventId: response.data.id });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el evento en Google Calendar', error: error.message });
    }
};
exports.createEvent = createEvent;
const getAllEvents = async (req, res) => {
    if (!req.session.token) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    oauth2Client.setCredentials(req.session.token);
    try {
        const response = await calendar.events.list({ calendarId: 'primary' });
        res.status(200).json(response.data.items);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los eventos', error: error.message });
    }
};
exports.getAllEvents = getAllEvents;
const getEventById = async (req, res) => {
    const { eventId } = req.params;
    if (!req.session.token) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }
    oauth2Client.setCredentials(req.session.token);
    try {
        const response = await calendar.events.get({
            calendarId: 'primary',
            eventId: eventId
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener el evento seleccionado', error: error.message });
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
        const response = await calendar.events.update({
            calendarId: 'primary',
            eventId: eventId,
            requestBody: event
        });
        res.status(200).json({ message: 'Evento actualizado con éxito', eventId: response.data.id });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al actualizar el evento', error: error.message });
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
        res.status(200).json({ message: 'Evento eliminado con éxito' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar el evento', error: error.message });
    }
};
exports.deleteEvent = deleteEvent;

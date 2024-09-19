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
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = void 0;
const googleapis_1 = require("googleapis");
const calendar = googleapis_1.google.calendar('v3');
const apiKey = process.env.AIzaSyA6u0yN3fc5pTvJp_bTWBwsVNsr6XJegaw;
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield calendar.events.insert({
            key: apiKey,
            calendarId: 'Agenda de Eventos',
            requestBody: event,
        });
        res.status(200).json({
            message: 'Evento creado con éxito',
            eventId: response.data.id,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error al crear el evento',
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: 'Error desconocido',
            });
        }
    }
});
exports.createEvent = createEvent;
const getAllEvents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield calendar.events.list({
            key: apiKey,
            calendarId: 'primary',
        });
        res.status(200).json(response.data.items);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error al obtener los Eventos',
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: 'Error desconocido',
            });
        }
    }
});
exports.getAllEvents = getAllEvents;
const getEventById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    try {
        const response = yield calendar.events.get({
            key: apiKey,
            calendarId: 'primary',
            eventId: eventId,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error al obtener el Eventos seleccionado',
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: 'Error desconocido',
            });
        }
    }
});
exports.getEventById = getEventById;
const updateEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const response = yield calendar.events.update({
            key: apiKey,
            calendarId: 'primary',
            eventId: eventId,
            requestBody: event,
        });
        res.status(200).json({
            message: 'Evento actualizado con éxito',
            eventId: response.data.id,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error al editar el Evento seleccionado',
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: 'Error desconocido',
            });
        }
    }
});
exports.updateEvent = updateEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { eventId } = req.params;
    try {
        yield calendar.events.delete({
            key: apiKey,
            calendarId: 'primary',
            eventId: eventId,
        });
        res.status(200).json({
            message: 'Evento eliminado con éxito',
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                message: 'Error al obtener el Eventos seleccionado',
                error: error.message,
            });
        }
        else {
            res.status(500).json({
                message: 'Error desconocido',
            });
        }
    }
});
exports.deleteEvent = deleteEvent;

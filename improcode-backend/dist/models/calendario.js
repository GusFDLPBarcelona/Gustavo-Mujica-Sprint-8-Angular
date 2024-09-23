"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarioModel = void 0;
const connection_1 = __importDefault(require("../db/connection"));
class CalendarioModel {
    static async getAllEvents() {
        const [rows] = await connection_1.default.query('SELECT * FROM events');
        return rows;
    }
    static async createEvent(eventData) {
        const { summary, location, description, startDateTime, endDateTime, googleEventId } = eventData;
        const query = 'INSERT INTO events (summary, location, description, startDateTime, endDateTime, googleEventId) VALUES (?, ?, ?, ?, ?, ?)';
        const result = await connection_1.default.query(query, [summary, location, description, startDateTime, endDateTime, googleEventId]);
        return result;
    }
    static async updateEvent(eventId, eventData) {
        const { summary, location, description, startDateTime, endDateTime } = eventData;
        const query = 'UPDATE events SET summary = ?, location = ?, description = ?, startDateTime = ?, endDateTime = ? WHERE googleEventId = ?';
        await connection_1.default.query(query, [summary, location, description, startDateTime, endDateTime, eventId]);
    }
    static async deleteEvent(eventId) {
        const query = 'DELETE FROM events WHERE googleEventId = ?';
        await connection_1.default.query(query, [eventId]);
    }
}
exports.CalendarioModel = CalendarioModel;

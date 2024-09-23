import connection from '../db/connection';

export class CalendarioModel {
    static async getAllEvents() {
        const [rows] = await connection.query('SELECT * FROM events');
        return rows;
    }

    static async createEvent(eventData: any) {
        const { summary, location, description, startDateTime, endDateTime, googleEventId } = eventData;
        const query = 'INSERT INTO events (summary, location, description, startDateTime, endDateTime, googleEventId) VALUES (?, ?, ?, ?, ?, ?)';
        const result = await connection.query(query, [summary, location, description, startDateTime, endDateTime, googleEventId]);
        return result;
    }

    static async updateEvent(eventId: string, eventData: any) {
        const { summary, location, description, startDateTime, endDateTime } = eventData;
        const query = 'UPDATE events SET summary = ?, location = ?, description = ?, startDateTime = ?, endDateTime = ? WHERE googleEventId = ?';
        await connection.query(query, [summary, location, description, startDateTime, endDateTime, eventId]);
    }

    static async deleteEvent(eventId: string) {
        const query = 'DELETE FROM events WHERE googleEventId = ?';
        await connection.query(query, [eventId]);
    }
}

import db from '../db/connection';

export const createEvent = async (summary: string, location: string, description: string, startDateTime: string, endDateTime: string) => {

    const [result] = await db.query(
        'INSERT INTO calendario (summary, location, description, startDateTime, endDateTime) VALUES (?, ?, ?, ?, ?)',
        [summary, location, description, startDateTime, endDateTime]
    );
    return result;
};

export const getAllEvents = async () => {
    const [rows] = await db.query('SELECT * FROM calendario');
    return rows;
};

export const getEventById = async (id: number) => {
    const [rows] = await db.query<any[]>('SELECT * FROM calendario WHERE id = ?', [id]);

    if (rows.length === 0) {
        throw new Error('Evento no encontrado');
    }
    return rows[0];
};

export const updateEvent = async (id: number, summary: string, location: string, description: string, startDateTime: string, endDateTime: string) => {
    const [result] = await db.query(
        'UPDATE calendario SET summary = ?, location = ?, description = ?, startDateTime = ?, endDateTime = ? WHERE id = ?',
        [summary, location, description, startDateTime, endDateTime, id]
    );
    return result;
};

export const deleteEvent = async (id: number) => {
    const [result] = await db.query('DELETE FROM calendario WHERE id = ?', [id]);
    return result;
};

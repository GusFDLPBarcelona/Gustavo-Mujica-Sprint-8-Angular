import { RowDataPacket, ResultSetHeader } from 'mysql2';
import connection from '../db/connection'; // Importamos la conexión a la base de datos

// Obtener todos los eventos
export const getAllEventos = async () => {
    const [rows] = await connection.query<RowDataPacket[]>(`SELECT * FROM eventos`);
    return rows;
};

// Crear un nuevo evento
export const createEvento = async (evento: any) => {
    const { summary, location, description, start, end } = evento;
    const [result] = await connection.query<ResultSetHeader>(
        `INSERT INTO eventos (summary, location, description, start, end) VALUES (?, ?, ?, ?, ?)`,
        [summary, location, description, start, end]
    );
    return result.insertId;
};

// Actualizar un evento existente por su ID
export const updateEvento = async (id: string, evento: any) => {
    const { summary, location, description, start, end } = evento;
    const [result] = await connection.query<ResultSetHeader>(
        `UPDATE eventos SET summary = ?, location = ?, description = ?, start = ?, end = ? WHERE id = ?`,
        [summary, location, description, start, end, id]
    );
    return result.affectedRows > 0; // Devuelve true si se actualizó
};

// Eliminar un evento por su ID
export const deleteEvento = async (id: string) => {
    const [result] = await connection.query<ResultSetHeader>(
        `DELETE FROM eventos WHERE id = ?`,
        [id]
    );
    return result.affectedRows > 0; // Devuelve true si se eliminó
};

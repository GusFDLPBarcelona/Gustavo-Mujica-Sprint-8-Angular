import db from '../db/connection';

// Obtener todos los marcadores
export const getMarkers = async () => {
    const [rows] = await db.query('SELECT * FROM marcadores');
    return rows;
};

// Verificar si existe un marcador con las mismas coordenadas
const markerExists = async (latitude: number, longitude: number): Promise<boolean> => {
    const [rows]: any = await db.query(
        'SELECT COUNT(*) as count FROM marcadores WHERE latitude = ? AND longitude = ?',
        [latitude, longitude]
    );
    return rows[0].count > 0;
};

export const addMarker = async (latitude: number, longitude: number, name: string) => {
    // Verificar si el marcador ya existe
    const exists = await markerExists(latitude, longitude);
    if (exists) {
        throw new Error('El marcador ya existe en la base de datos');
    }

    // Si no existe, insertar el nuevo marcador con el nombre
    const [result] = await db.query(
        'INSERT INTO marcadores (latitude, longitude, name) VALUES (?, ?, ?)',
        [latitude, longitude, name]
    );
    return result;
};


// Eliminar marcador
export const deleteMarker = async (id: number) => {
    const [result] = await db.query('DELETE FROM marcadores WHERE id = ?', [id]);
    return result;
};

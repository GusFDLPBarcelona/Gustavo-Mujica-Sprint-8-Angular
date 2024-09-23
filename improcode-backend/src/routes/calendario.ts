import { Router } from 'express';
import { getEventos, createEvento, updateEvento, deleteEvento } from '../controllers/calendario';

const router = Router();

// Ruta para obtener todos los eventos
router.get('/eventos', getEventos);

// Ruta para crear un nuevo evento
router.post('/eventos', createEvento);

// Ruta para actualizar un evento por ID
router.put('/eventos/:id', updateEvento);

// Ruta para eliminar un evento por ID
router.delete('/eventos/:id', deleteEvento);

export default router;

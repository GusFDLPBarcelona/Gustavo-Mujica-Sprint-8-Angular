import { Router } from 'express';
import { createEvent, getAllEvents, getEventById, deleteEvent, updateEvent } from '../controllers/calendario';

const router = Router();

router.post('/create', createEvent);
router.get('/', getAllEvents);
router.get('/:eventId', getEventById);
router.put('/:eventId', updateEvent);
router.delete('/:eventId', deleteEvent);

export default router;
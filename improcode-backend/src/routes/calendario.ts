import { Router } from 'express';
import { createEvent, getAllEvents, getEventById, deleteEvent, updateEvent } from '../controllers/calendario';

const router = Router();

router.post('/create', createEvent);
router.get('/events', getAllEvents);
router.get('/events/:eventId', getEventById);
router.put('/events/:eventId', updateEvent);
router.delete('/events/:eventId', deleteEvent);

export default router;
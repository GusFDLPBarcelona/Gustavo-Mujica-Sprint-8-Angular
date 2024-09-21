import { Router } from 'express';
import { getAuthUrl, oauth2callback, createEvent, getAllEvents, getEventById, deleteEvent, updateEvent, checkAuth } from '../controllers/calendario';

const router = Router();

router.get('/auth', getAuthUrl);
router.get('/oauth2callback', oauth2callback);
router.get('/checkAuth', checkAuth);
router.post('/create', createEvent);
router.get('/', getAllEvents);
router.get('/:eventId', getEventById);
router.put('/:eventId', updateEvent);
router.delete('/:eventId', deleteEvent);

export default router;

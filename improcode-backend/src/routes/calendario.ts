import { Router } from 'express';
import { getAuthUrl, oauth2callback, createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } from '../controllers/calendario';

const router = Router();

const isAuthenticated = (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        // Aquí puedes verificar el token con Google o comprobar si es válido
        if (token) {
            req.token = token; // Almacenar el token en el objeto req para usarlo después
            next();
        } else {
            return res.status(401).json({ message: 'Token inválido' });
        }
    } else {
        return res.status(401).json({ message: 'Usuario no autenticado, token no presente' });
    }
};

router.get('/auth', getAuthUrl);
router.get('/oauth2callback', oauth2callback);
router.post('/create-event', isAuthenticated, createEvent);
router.get('/events', isAuthenticated, getAllEvents);
router.get('/events/:eventId', isAuthenticated, getEventById);
router.put('/events/:eventId', isAuthenticated, updateEvent);
router.delete('/events/:eventId', isAuthenticated, deleteEvent);

export default router;

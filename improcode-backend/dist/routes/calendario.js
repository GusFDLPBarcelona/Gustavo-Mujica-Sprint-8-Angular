"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendario_1 = require("../controllers/calendario");
const router = (0, express_1.Router)();
const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        // Aquí puedes verificar el token con Google o comprobar si es válido
        if (token) {
            req.token = token; // Almacenar el token en el objeto req para usarlo después
            next();
        }
        else {
            return res.status(401).json({ message: 'Token inválido' });
        }
    }
    else {
        return res.status(401).json({ message: 'Usuario no autenticado, token no presente' });
    }
};
router.get('/auth', calendario_1.getAuthUrl);
router.get('/oauth2callback', calendario_1.oauth2callback);
router.post('/create-event', isAuthenticated, calendario_1.createEvent);
router.get('/events', isAuthenticated, calendario_1.getAllEvents);
router.get('/events/:eventId', isAuthenticated, calendario_1.getEventById);
router.put('/events/:eventId', isAuthenticated, calendario_1.updateEvent);
router.delete('/events/:eventId', isAuthenticated, calendario_1.deleteEvent);
exports.default = router;

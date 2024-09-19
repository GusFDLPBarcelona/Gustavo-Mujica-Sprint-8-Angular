"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendario_1 = require("../controllers/calendario");
const router = (0, express_1.Router)();
router.post('/create', calendario_1.createEvent);
router.get('/events', calendario_1.getAllEvents);
router.get('/events/:eventId', calendario_1.getEventById);
router.put('/events/:eventId', calendario_1.updateEvent);
router.delete('/events/:eventId', calendario_1.deleteEvent);
exports.default = router;

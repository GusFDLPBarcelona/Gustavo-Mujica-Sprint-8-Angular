"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendario_1 = require("../controllers/calendario");
const router = (0, express_1.Router)();
// Ruta para obtener todos los eventos
router.get('/eventos', calendario_1.getEventos);
// Ruta para crear un nuevo evento
router.post('/eventos', calendario_1.createEvento);
// Ruta para actualizar un evento por ID
router.put('/eventos/:id', calendario_1.updateEvento);
// Ruta para eliminar un evento por ID
router.delete('/eventos/:id', calendario_1.deleteEvento);
exports.default = router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const graficos_1 = require("../controllers/graficos");
const router = (0, express_1.Router)();
router.get('/test', (req, res) => {
    res.json({ message: 'Test exitoso' });
});
router.get('/', graficos_1.getAllGraficos);
router.post('/', graficos_1.createGrafico);
router.delete('/:id', graficos_1.removeGrafico);
exports.default = router;

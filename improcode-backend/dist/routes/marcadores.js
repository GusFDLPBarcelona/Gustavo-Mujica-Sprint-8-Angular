"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marcadores_1 = require("../controllers/marcadores");
const router = (0, express_1.Router)();
router.get('/', marcadores_1.getAllMarkers);
router.post('/', marcadores_1.createMarker);
router.delete('/:id', marcadores_1.removeMarker);
exports.default = router;

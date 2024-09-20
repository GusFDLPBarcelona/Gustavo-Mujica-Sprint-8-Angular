"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEvent = exports.updateEvent = exports.getEventById = exports.getAllEvents = exports.createEvent = void 0;
const connection_1 = __importDefault(require("../db/connection"));
const createEvent = (summary, location, description, startDateTime, endDateTime) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.query('INSERT INTO calendario (summary, location, description, startDateTime, endDateTime) VALUES (?, ?, ?, ?, ?)', [summary, location, description, startDateTime, endDateTime]);
    return result;
});
exports.createEvent = createEvent;
const getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query('SELECT * FROM calendario');
    return rows;
});
exports.getAllEvents = getAllEvents;
const getEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [rows] = yield connection_1.default.query('SELECT * FROM calendario WHERE id = ?', [id]);
    if (rows.length === 0) {
        throw new Error('Evento no encontrado');
    }
    return rows[0];
});
exports.getEventById = getEventById;
const updateEvent = (id, summary, location, description, startDateTime, endDateTime) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.query('UPDATE calendario SET summary = ?, location = ?, description = ?, startDateTime = ?, endDateTime = ? WHERE id = ?', [summary, location, description, startDateTime, endDateTime, id]);
    return result;
});
exports.updateEvent = updateEvent;
const deleteEvent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield connection_1.default.query('DELETE FROM calendario WHERE id = ?', [id]);
    return result;
});
exports.deleteEvent = deleteEvent;

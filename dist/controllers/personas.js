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
exports.deletePersona = exports.updatePersona = exports.createPersona = exports.getPersonaById = exports.getAllPersonas = void 0;
const Persona_1 = __importDefault(require("../models/Persona"));
const getAllPersonas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const personas = yield Persona_1.default.findAll();
        res.status(200).json(personas);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las personas", error });
    }
});
exports.getAllPersonas = getAllPersonas;
const getPersonaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const persona = yield Persona_1.default.findByPk(id);
        if (persona) {
            res.status(200).json(persona);
        }
        else {
            res.status(404).json({ message: "Persona no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener la persona", error });
    }
});
exports.getPersonaById = getPersonaById;
const createPersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, correo, n_identificacion, fono } = req.body;
    try {
        const nuevaPersona = yield Persona_1.default.create({
            nombre,
            correo,
            n_identificacion,
            fono,
        });
        res.status(201).json(nuevaPersona);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear la persona", error });
    }
});
exports.createPersona = createPersona;
const updatePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, correo, n_identificacion, fono } = req.body;
    try {
        const persona = yield Persona_1.default.findByPk(id);
        if (persona) {
            yield persona.update({ nombre, correo, n_identificacion, fono });
            res.status(200).json(persona);
        }
        else {
            res.status(404).json({ message: "Persona no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar la persona", error });
    }
});
exports.updatePersona = updatePersona;
const deletePersona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const persona = yield Persona_1.default.findByPk(id);
        if (persona) {
            // await persona.destroy();
            res.status(200).json({ message: "Persona eliminada correctamente" });
        }
        else {
            res.status(404).json({ message: "Persona no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la persona", error });
    }
});
exports.deletePersona = deletePersona;
//# sourceMappingURL=personas.js.map
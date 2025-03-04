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
exports.deleteEstado = exports.updateEstado = exports.createEstado = exports.getEstadoById = exports.getAllEstados = void 0;
const Estado_1 = __importDefault(require("../models/Estado"));
const getAllEstados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estados = yield Estado_1.default.findAll();
        res.status(200).json(estados);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los estados", error });
    }
});
exports.getAllEstados = getAllEstados;
const getEstadoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const estado = yield Estado_1.default.findByPk(id);
        if (estado) {
            res.status(200).json(estado);
        }
        else {
            res.status(404).json({ message: "Estado no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el estado", error });
    }
});
exports.getEstadoById = getEstadoById;
const createEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    try {
        const nuevoEstado = yield Estado_1.default.create({ nombre });
        res.status(201).json(nuevoEstado);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el estado", error });
    }
});
exports.createEstado = createEstado;
const updateEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const estado = yield Estado_1.default.findByPk(id);
        if (estado) {
            yield estado.update({ nombre });
            res.status(200).json(estado);
        }
        else {
            res.status(404).json({ message: "Estado no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el estado", error });
    }
});
exports.updateEstado = updateEstado;
const deleteEstado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const estado = yield Estado_1.default.findByPk(id);
        if (estado) {
            yield estado.destroy();
            res.status(200).json({ message: "Estado eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Estado no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el estado", error });
    }
});
exports.deleteEstado = deleteEstado;
//# sourceMappingURL=estados.js.map
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
exports.deleteComuna = exports.updateComuna = exports.createComuna = exports.getComunaById = exports.getAllComunas = void 0;
const Comuna_1 = __importDefault(require("../models/Comuna")); // Importamos el modelo Comuna
// Obtener todas las comunas
const getAllComunas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comunas = yield Comuna_1.default.findAll();
        res.status(200).json(comunas);
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener las comunas",
            error,
        });
    }
});
exports.getAllComunas = getAllComunas;
// Obtener una comuna por ID
const getComunaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const comuna = yield Comuna_1.default.findByPk(id);
        if (comuna) {
            res.status(200).json(comuna);
        }
        else {
            res.status(404).json({ message: "Comuna no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({
            message: "Error al obtener la comuna",
            error,
        });
    }
});
exports.getComunaById = getComunaById;
// Crear una nueva comuna
const createComuna = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, region_id } = req.body;
    try {
        const nuevaComuna = yield Comuna_1.default.create({
            nombre,
            region_id,
        });
        res.status(201).json(nuevaComuna);
    }
    catch (error) {
        res.status(500).json({
            message: "Error al crear la comuna",
            error,
        });
    }
});
exports.createComuna = createComuna;
// Actualizar una comuna existente
const updateComuna = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, region_id } = req.body;
    try {
        const comuna = yield Comuna_1.default.findByPk(id);
        if (!comuna) {
            return res.status(404).json({ message: "Comuna no encontrada" });
        }
        yield comuna.update({
            nombre,
            region_id,
        });
        res.status(200).json(comuna);
    }
    catch (error) {
        res.status(500).json({
            message: "Error al actualizar la comuna",
            error,
        });
    }
});
exports.updateComuna = updateComuna;
// Eliminar una comuna
const deleteComuna = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const comuna = yield Comuna_1.default.findByPk(id);
        if (!comuna) {
            return res.status(404).json({ message: "Comuna no encontrada" });
        }
        yield comuna.destroy();
        res.status(200).json({ message: "Comuna eliminada correctamente" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al eliminar la comuna",
            error,
        });
    }
});
exports.deleteComuna = deleteComuna;
//# sourceMappingURL=comunas.js.map
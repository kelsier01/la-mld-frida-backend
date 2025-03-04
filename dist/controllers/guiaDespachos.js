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
exports.deleteGuiaDespacho = exports.updateGuiaDespacho = exports.createGuiaDespacho = exports.getGuiaDespachoById = exports.getAllGuiasDespacho = void 0;
const GuiaDespacho_1 = __importDefault(require("../models/GuiaDespacho"));
const getAllGuiasDespacho = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const guiasDespacho = yield GuiaDespacho_1.default.findAll();
        res.status(200).json(guiasDespacho);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener las guías de despacho", error });
    }
});
exports.getAllGuiasDespacho = getAllGuiasDespacho;
const getGuiaDespachoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const guiaDespacho = yield GuiaDespacho_1.default.findByPk(id);
        if (guiaDespacho) {
            res.status(200).json(guiaDespacho);
        }
        else {
            res.status(404).json({ message: "Guía de despacho no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener la guía de despacho", error });
    }
});
exports.getGuiaDespachoById = getGuiaDespachoById;
const createGuiaDespacho = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo, estados_id } = req.body;
    try {
        const nuevaGuiaDespacho = yield GuiaDespacho_1.default.create({ codigo, estados_id });
        res.status(201).json(nuevaGuiaDespacho);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al crear la guía de despacho", error });
    }
});
exports.createGuiaDespacho = createGuiaDespacho;
const updateGuiaDespacho = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { codigo, estados_id } = req.body;
    try {
        const guiaDespacho = yield GuiaDespacho_1.default.findByPk(id);
        if (guiaDespacho) {
            yield guiaDespacho.update({ codigo, estados_id });
            res.status(200).json(guiaDespacho);
        }
        else {
            res.status(404).json({ message: "Guía de despacho no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al actualizar la guía de despacho", error });
    }
});
exports.updateGuiaDespacho = updateGuiaDespacho;
const deleteGuiaDespacho = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const guiaDespacho = yield GuiaDespacho_1.default.findByPk(id);
        if (guiaDespacho) {
            yield guiaDespacho.destroy();
            res
                .status(200)
                .json({ message: "Guía de despacho eliminada correctamente" });
        }
        else {
            res.status(404).json({ message: "Guía de despacho no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al eliminar la guía de despacho", error });
    }
});
exports.deleteGuiaDespacho = deleteGuiaDespacho;
//# sourceMappingURL=guiaDespachos.js.map
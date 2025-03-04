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
exports.deleteBodega = exports.updateBodega = exports.createBodega = exports.getBodegaById = exports.getAllBodegas = void 0;
const Bodega_1 = __importDefault(require("../models/Bodega"));
const getAllBodegas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodegas = yield Bodega_1.default.findAll();
        res.status(200).json(bodegas);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las bodegas", error });
    }
});
exports.getAllBodegas = getAllBodegas;
const getBodegaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bodega = yield Bodega_1.default.findByPk(id);
        if (bodega) {
            res.status(200).json(bodega);
        }
        else {
            res.status(404).json({ message: "Bodega no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener la bodega", error });
    }
});
exports.getBodegaById = getBodegaById;
const createBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, ubicacion } = req.body;
    try {
        const nuevaBodega = yield Bodega_1.default.create({ nombre, ubicacion });
        res.status(201).json(nuevaBodega);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear la bodega", error });
    }
});
exports.createBodega = createBodega;
const updateBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, ubicacion } = req.body;
    try {
        const bodega = yield Bodega_1.default.findByPk(id);
        if (bodega) {
            yield bodega.update({ nombre, ubicacion });
            res.status(200).json(bodega);
        }
        else {
            res.status(404).json({ message: "Bodega no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar la bodega", error });
    }
});
exports.updateBodega = updateBodega;
const deleteBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const bodega = yield Bodega_1.default.findByPk(id);
        if (bodega) {
            yield bodega.destroy();
            res.status(200).json({ message: "Bodega eliminada correctamente" });
        }
        else {
            res.status(404).json({ message: "Bodega no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la bodega", error });
    }
});
exports.deleteBodega = deleteBodega;
//# sourceMappingURL=bodegas.js.map
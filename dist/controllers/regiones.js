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
exports.deleteRegion = exports.updateRegion = exports.createRegion = exports.getRegionById = exports.getAllRegiones = void 0;
const Region_1 = __importDefault(require("../models/Region")); // Asegúrate de importar el modelo Region
const getAllRegiones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regiones = yield Region_1.default.findAll();
        res.status(200).json(regiones);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las regiones", error });
    }
});
exports.getAllRegiones = getAllRegiones;
const getRegionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const region = yield Region_1.default.findByPk(id);
        if (region) {
            res.status(200).json(region);
        }
        else {
            res.status(404).json({ message: "Región no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener la región", error });
    }
});
exports.getRegionById = getRegionById;
const createRegion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    try {
        const nuevaRegion = yield Region_1.default.create({ nombre });
        res.status(201).json(nuevaRegion);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear la región", error });
    }
});
exports.createRegion = createRegion;
const updateRegion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const region = yield Region_1.default.findByPk(id);
        if (region) {
            yield region.update({ nombre });
            res.status(200).json(region);
        }
        else {
            res.status(404).json({ message: "Región no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar la región", error });
    }
});
exports.updateRegion = updateRegion;
const deleteRegion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const region = yield Region_1.default.findByPk(id);
        if (region) {
            yield region.destroy();
            res.status(200).json({ message: "Región eliminada correctamente" });
        }
        else {
            res.status(404).json({ message: "Región no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la región", error });
    }
});
exports.deleteRegion = deleteRegion;
//# sourceMappingURL=regiones.js.map
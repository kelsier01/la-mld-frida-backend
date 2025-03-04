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
exports.deleteDireccion = exports.updateDireccion = exports.createDireccion = exports.getDireccionById = exports.getAllDirecciones = void 0;
const Direccion_1 = __importDefault(require("../models/Direccion"));
const getAllDirecciones = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const direcciones = yield Direccion_1.default.findAll();
        res.status(200).json(direcciones);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener las direcciones", error });
    }
});
exports.getAllDirecciones = getAllDirecciones;
const getDireccionById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const direccion = yield Direccion_1.default.findByPk(id);
        if (direccion) {
            res.status(200).json(direccion);
        }
        else {
            res.status(404).json({ message: "Dirección no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener la dirección", error });
    }
});
exports.getDireccionById = getDireccionById;
const createDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { clientes_id, direccion, region, comuna } = req.body;
    try {
        const nuevaDireccion = yield Direccion_1.default.create({
            clientes_id,
            direccion,
            region,
            comuna,
        });
        res.status(201).json(nuevaDireccion);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear la dirección", error });
    }
});
exports.createDireccion = createDireccion;
const updateDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { clientes_id, direccion, region, comuna } = req.body;
    try {
        const direccionExistente = yield Direccion_1.default.findByPk(id);
        if (direccionExistente) {
            yield direccionExistente.update({
                clientes_id,
                direccion,
                region,
                comuna,
            });
            res.status(200).json(direccionExistente);
        }
        else {
            res.status(404).json({ message: "Dirección no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al actualizar la dirección", error });
    }
});
exports.updateDireccion = updateDireccion;
const deleteDireccion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const direccion = yield Direccion_1.default.findByPk(id);
        if (direccion) {
            yield direccion.destroy();
            res.status(200).json({ message: "Dirección eliminada correctamente" });
        }
        else {
            res.status(404).json({ message: "Dirección no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la dirección", error });
    }
});
exports.deleteDireccion = deleteDireccion;
//# sourceMappingURL=direcciones.js.map
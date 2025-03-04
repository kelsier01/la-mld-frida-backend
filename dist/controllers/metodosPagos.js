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
exports.deleteMetodoPago = exports.updateMetodoPago = exports.createMetodoPago = exports.getMetodoPagoById = exports.getAllMetodosPago = void 0;
const MetodoPago_1 = __importDefault(require("../models/MetodoPago"));
const getAllMetodosPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const metodosPago = yield MetodoPago_1.default.findAll();
        res.status(200).json(metodosPago);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener los métodos de pago", error });
    }
});
exports.getAllMetodosPago = getAllMetodosPago;
const getMetodoPagoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const metodoPago = yield MetodoPago_1.default.findByPk(id);
        if (metodoPago) {
            res.status(200).json(metodoPago);
        }
        else {
            res.status(404).json({ message: "Método de pago no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener el método de pago", error });
    }
});
exports.getMetodoPagoById = getMetodoPagoById;
const createMetodoPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    try {
        const nuevoMetodoPago = yield MetodoPago_1.default.create({ nombre });
        res.status(201).json(nuevoMetodoPago);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al crear el método de pago", error });
    }
});
exports.createMetodoPago = createMetodoPago;
const updateMetodoPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const metodoPago = yield MetodoPago_1.default.findByPk(id);
        if (metodoPago) {
            yield metodoPago.update({ nombre });
            res.status(200).json(metodoPago);
        }
        else {
            res.status(404).json({ message: "Método de pago no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al actualizar el método de pago", error });
    }
});
exports.updateMetodoPago = updateMetodoPago;
const deleteMetodoPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const metodoPago = yield MetodoPago_1.default.findByPk(id);
        if (metodoPago) {
            yield metodoPago.destroy();
            res
                .status(200)
                .json({ message: "Método de pago eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Método de pago no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al eliminar el método de pago", error });
    }
});
exports.deleteMetodoPago = deleteMetodoPago;
//# sourceMappingURL=metodosPagos.js.map
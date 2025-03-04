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
exports.deleteComprobanteVenta = exports.updateComprobanteVenta = exports.createComprobanteVenta = exports.getComprobanteVentaById = exports.getAllComprobantesVenta = void 0;
const ComprobanteVenta_1 = __importDefault(require("../models/ComprobanteVenta"));
const getAllComprobantesVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comprobantesVenta = yield ComprobanteVenta_1.default.findAll();
        res.status(200).json(comprobantesVenta);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener los comprobantes de venta", error });
    }
});
exports.getAllComprobantesVenta = getAllComprobantesVenta;
const getComprobanteVentaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const comprobanteVenta = yield ComprobanteVenta_1.default.findByPk(id);
        if (comprobanteVenta) {
            res.status(200).json(comprobanteVenta);
        }
        else {
            res.status(404).json({ message: "Comprobante de venta no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener el comprobante de venta", error });
    }
});
exports.getComprobanteVentaById = getComprobanteVentaById;
const createComprobanteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo, estados_id } = req.body;
    try {
        const nuevoComprobanteVenta = yield ComprobanteVenta_1.default.create({
            codigo,
            estados_id,
        });
        res.status(201).json(nuevoComprobanteVenta);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al crear el comprobante de venta", error });
    }
});
exports.createComprobanteVenta = createComprobanteVenta;
const updateComprobanteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { codigo, estados_id } = req.body;
    try {
        const comprobanteVenta = yield ComprobanteVenta_1.default.findByPk(id);
        if (comprobanteVenta) {
            yield comprobanteVenta.update({ codigo, estados_id });
            res.status(200).json(comprobanteVenta);
        }
        else {
            res.status(404).json({ message: "Comprobante de venta no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al actualizar el comprobante de venta", error });
    }
});
exports.updateComprobanteVenta = updateComprobanteVenta;
const deleteComprobanteVenta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const comprobanteVenta = yield ComprobanteVenta_1.default.findByPk(id);
        if (comprobanteVenta) {
            yield comprobanteVenta.destroy();
            res
                .status(200)
                .json({ message: "Comprobante de venta eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Comprobante de venta no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al eliminar el comprobante de venta", error });
    }
});
exports.deleteComprobanteVenta = deleteComprobanteVenta;
//# sourceMappingURL=comprobantesVentas.js.map
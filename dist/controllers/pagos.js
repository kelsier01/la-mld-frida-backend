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
exports.deletePago = exports.updatePago = exports.createPago = exports.getPagoById = exports.getAllPagos = void 0;
const Pago_1 = __importDefault(require("../models/Pago"));
const getAllPagos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pagos = yield Pago_1.default.findAll();
        res.status(200).json(pagos);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los pagos", error });
    }
});
exports.getAllPagos = getAllPagos;
const getPagoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pago = yield Pago_1.default.findByPk(id);
        if (pago) {
            res.status(200).json(pago);
        }
        else {
            res.status(404).json({ message: "Pago no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el pago", error });
    }
});
exports.getPagoById = getPagoById;
const createPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pedidos_id, monto, fecha_pago, pago_parcializado, metodos_pago_id } = req.body;
    try {
        const nuevoPago = yield Pago_1.default.create({
            pedidos_id,
            monto,
            fecha_pago,
            pago_parcializado,
            metodos_pago_id,
        });
        res.status(201).json(nuevoPago);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el pago", error });
    }
});
exports.createPago = createPago;
const updatePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { pedidos_id, monto, fecha_pago, pago_parcializado, metodos_pago_id } = req.body;
    try {
        const pago = yield Pago_1.default.findByPk(id);
        if (pago) {
            yield pago.update({
                pedidos_id,
                monto,
                fecha_pago,
                pago_parcializado,
                metodos_pago_id,
            });
            res.status(200).json(pago);
        }
        else {
            res.status(404).json({ message: "Pago no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el pago", error });
    }
});
exports.updatePago = updatePago;
const deletePago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pago = yield Pago_1.default.findByPk(id);
        if (pago) {
            yield pago.destroy();
            res.status(200).json({ message: "Pago eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Pago no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el pago", error });
    }
});
exports.deletePago = deletePago;
//# sourceMappingURL=pagos.js.map
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
exports.deleteDetallePedido = exports.updateDetallePedido = exports.createDetallePedido = exports.getDetallePedidoById = exports.getAllDetallePedidos = void 0;
const DetallePedido_1 = __importDefault(require("../models/DetallePedido"));
const getAllDetallePedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const detallePedidos = yield DetallePedido_1.default.findAll();
        res.status(200).json(detallePedidos);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener los detalles de pedido", error });
    }
});
exports.getAllDetallePedidos = getAllDetallePedidos;
const getDetallePedidoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const detallePedido = yield DetallePedido_1.default.findByPk(id);
        if (detallePedido) {
            res.status(200).json(detallePedido);
        }
        else {
            res.status(404).json({ message: "Detalle de pedido no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener el detalle de pedido", error });
    }
});
exports.getDetallePedidoById = getDetallePedidoById;
const createDetallePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pedidos_id, productos_id, cantidad, precio_venta, precio_compra_clp, precio_compra_usd, precio_compra_guia, adicional, bodegas_id, } = req.body;
    try {
        const nuevoDetallePedido = yield DetallePedido_1.default.create({
            pedidos_id,
            productos_id,
            cantidad,
            precio_venta,
            precio_compra_clp,
            precio_compra_usd,
            precio_compra_guia,
            adicional,
            bodegas_id,
        });
        res.status(201).json(nuevoDetallePedido);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al crear el detalle de pedido", error });
    }
});
exports.createDetallePedido = createDetallePedido;
const updateDetallePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { pedidos_id, productos_id, cantidad, precio_venta, precio_compra_clp, precio_compra_usd, precio_compra_guia, adicional, bodegas_id, } = req.body;
    try {
        const detallePedido = yield DetallePedido_1.default.findByPk(id);
        if (detallePedido) {
            yield detallePedido.update({
                pedidos_id,
                productos_id,
                cantidad,
                precio_venta,
                precio_compra_clp,
                precio_compra_usd,
                precio_compra_guia,
                adicional,
                bodegas_id,
            });
            res.status(200).json(detallePedido);
        }
        else {
            res.status(404).json({ message: "Detalle de pedido no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al actualizar el detalle de pedido", error });
    }
});
exports.updateDetallePedido = updateDetallePedido;
const deleteDetallePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const detallePedido = yield DetallePedido_1.default.findByPk(id);
        if (detallePedido) {
            yield detallePedido.destroy();
            res
                .status(200)
                .json({ message: "Detalle de pedido eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Detalle de pedido no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al eliminar el detalle de pedido", error });
    }
});
exports.deleteDetallePedido = deleteDetallePedido;
//# sourceMappingURL=detallePedidos.js.map
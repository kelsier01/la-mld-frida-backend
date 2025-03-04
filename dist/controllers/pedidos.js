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
exports.deletePedido = exports.updatePedido = exports.createPedido = exports.getPedidoById = exports.getAllPedidos = void 0;
const Pedido_1 = __importDefault(require("../models/Pedido"));
const getAllPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pedidos = yield Pedido_1.default.findAll();
        res.status(200).json(pedidos);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los pedidos", error });
    }
});
exports.getAllPedidos = getAllPedidos;
const getPedidoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pedido = yield Pedido_1.default.findByPk(id);
        if (pedido) {
            res.status(200).json(pedido);
        }
        else {
            res.status(404).json({ message: "Pedido no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el pedido", error });
    }
});
exports.getPedidoById = getPedidoById;
const createPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { empleados_id, clientes_id, estado_pedidos_id, deliverys_id, monto_total, documento_usa_id, n_despacho_chile, comprobante_ventas_id, } = req.body;
    try {
        const nuevoPedido = yield Pedido_1.default.create({
            empleados_id,
            clientes_id,
            estado_pedidos_id,
            deliverys_id,
            monto_total,
            documento_usa_id,
            n_despacho_chile,
            comprobante_ventas_id,
        });
        res.status(201).json(nuevoPedido);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el pedido", error });
    }
});
exports.createPedido = createPedido;
const updatePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { empleados_id, clientes_id, estado_pedidos_id, deliverys_id, monto_total, documento_usa_id, n_despacho_chile, comprobante_ventas_id, } = req.body;
    try {
        const pedido = yield Pedido_1.default.findByPk(id);
        if (pedido) {
            yield pedido.update({
                empleados_id,
                clientes_id,
                estado_pedidos_id,
                deliverys_id,
                monto_total,
                documento_usa_id,
                n_despacho_chile,
                comprobante_ventas_id,
            });
            res.status(200).json(pedido);
        }
        else {
            res.status(404).json({ message: "Pedido no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el pedido", error });
    }
});
exports.updatePedido = updatePedido;
const deletePedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pedido = yield Pedido_1.default.findByPk(id);
        if (pedido) {
            yield pedido.destroy();
            res.status(200).json({ message: "Pedido eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Pedido no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el pedido", error });
    }
});
exports.deletePedido = deletePedido;
//# sourceMappingURL=pedidos.js.map
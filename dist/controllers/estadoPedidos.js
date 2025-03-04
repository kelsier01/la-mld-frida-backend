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
exports.deleteEstadoPedido = exports.updateEstadoPedido = exports.createEstadoPedido = exports.getEstadoPedidoById = exports.getAllEstadoPedidos = void 0;
const EstadoPedido_1 = __importDefault(require("../models/EstadoPedido"));
const getAllEstadoPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const estadoPedidos = yield EstadoPedido_1.default.findAll();
        res.status(200).json(estadoPedidos);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener los estados de pedidos", error });
    }
});
exports.getAllEstadoPedidos = getAllEstadoPedidos;
const getEstadoPedidoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const estadoPedido = yield EstadoPedido_1.default.findByPk(id);
        if (estadoPedido) {
            res.status(200).json(estadoPedido);
        }
        else {
            res.status(404).json({ message: "Estado de pedido no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener el estado de pedido", error });
    }
});
exports.getEstadoPedidoById = getEstadoPedidoById;
const createEstadoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { estado_pedido } = req.body;
    try {
        const nuevoEstadoPedido = yield EstadoPedido_1.default.create({ estado_pedido });
        res.status(201).json(nuevoEstadoPedido);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al crear el estado de pedido", error });
    }
});
exports.createEstadoPedido = createEstadoPedido;
const updateEstadoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { estado_pedido } = req.body;
    try {
        const estadoPedido = yield EstadoPedido_1.default.findByPk(id);
        if (estadoPedido) {
            yield estadoPedido.update({ estado_pedido });
            res.status(200).json(estadoPedido);
        }
        else {
            res.status(404).json({ message: "Estado de pedido no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al actualizar el estado de pedido", error });
    }
});
exports.updateEstadoPedido = updateEstadoPedido;
const deleteEstadoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const estadoPedido = yield EstadoPedido_1.default.findByPk(id);
        if (estadoPedido) {
            yield estadoPedido.destroy();
            res
                .status(200)
                .json({ message: "Estado de pedido eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Estado de pedido no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al eliminar el estado de pedido", error });
    }
});
exports.deleteEstadoPedido = deleteEstadoPedido;
//# sourceMappingURL=estadoPedidos.js.map
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
exports.deleteLogEstadoPedido = exports.updateLogEstadoPedido = exports.createLogEstadoPedido = exports.getLogEstadoPedidoById = exports.getAllLogEstadoPedidos = void 0;
const LogEstadoPedido_1 = __importDefault(require("../models/LogEstadoPedido"));
const getAllLogEstadoPedidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logEstadoPedidos = yield LogEstadoPedido_1.default.findAll();
        res.status(200).json(logEstadoPedidos);
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: "Error al obtener los logs de estado de pedido",
            error,
        });
    }
});
exports.getAllLogEstadoPedidos = getAllLogEstadoPedidos;
const getLogEstadoPedidoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const logEstadoPedido = yield LogEstadoPedido_1.default.findByPk(id);
        if (logEstadoPedido) {
            res.status(200).json(logEstadoPedido);
        }
        else {
            res
                .status(404)
                .json({ message: "Log de estado de pedido no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener el log de estado de pedido", error });
    }
});
exports.getLogEstadoPedidoById = getLogEstadoPedidoById;
const createLogEstadoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pedidos_id, estado_pedidos_id, empleados_id } = req.body;
    try {
        const nuevoLogEstadoPedido = yield LogEstadoPedido_1.default.create({
            pedidos_id,
            estado_pedidos_id,
            empleados_id,
        });
        res.status(201).json(nuevoLogEstadoPedido);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al crear el log de estado de pedido", error });
    }
});
exports.createLogEstadoPedido = createLogEstadoPedido;
const updateLogEstadoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { pedidos_id, estado_pedidos_id, empleados_id } = req.body;
    try {
        const logEstadoPedido = yield LogEstadoPedido_1.default.findByPk(id);
        if (logEstadoPedido) {
            yield logEstadoPedido.update({
                pedidos_id,
                estado_pedidos_id,
                empleados_id,
            });
            res.status(200).json(logEstadoPedido);
        }
        else {
            res
                .status(404)
                .json({ message: "Log de estado de pedido no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({
            message: "Error al actualizar el log de estado de pedido",
            error,
        });
    }
});
exports.updateLogEstadoPedido = updateLogEstadoPedido;
const deleteLogEstadoPedido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const logEstadoPedido = yield LogEstadoPedido_1.default.findByPk(id);
        if (logEstadoPedido) {
            yield logEstadoPedido.destroy();
            res
                .status(200)
                .json({ message: "Log de estado de pedido eliminado correctamente" });
        }
        else {
            res
                .status(404)
                .json({ message: "Log de estado de pedido no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al eliminar el log de estado de pedido", error });
    }
});
exports.deleteLogEstadoPedido = deleteLogEstadoPedido;
//# sourceMappingURL=logEstadosPedidos.js.map
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
exports.getPedidosByComprobanteVentaId = exports.getPedidosByGuiaDespachoId = exports.deletePedido = exports.updatePedido = exports.createPedido = exports.getPedidoById = exports.getAllPedidos = void 0;
const Pedido_1 = __importDefault(require("../models/Pedido"));
const Cliente_1 = __importDefault(require("../models/Cliente"));
const ComprobanteVenta_1 = __importDefault(require("../models/ComprobanteVenta"));
const Delivery_1 = __importDefault(require("../models/Delivery"));
const Empleado_1 = __importDefault(require("../models/Empleado"));
const EstadoPedido_1 = __importDefault(require("../models/EstadoPedido"));
const GuiaDespacho_1 = __importDefault(require("../models/GuiaDespacho"));
const Persona_1 = __importDefault(require("../models/Persona"));
const sequelize_1 = require("sequelize");
const Direccion_1 = __importDefault(require("../models/Direccion"));
const Region_1 = __importDefault(require("../models/Region"));
const Comuna_1 = __importDefault(require("../models/Comuna"));
const getAllPedidos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search = "", page = "1", limit = 10, fecha_desde, fecha_hasta, estadoId, clienteId, regionId, } = req.query;
        const pageNumber = Number(page);
        const limite = Number(limit);
        const desde = fecha_desde || "";
        const hasta = fecha_hasta || "";
        const estado = estadoId != 0 ? estadoId : "";
        const cliente = clienteId != 0 ? clienteId : "";
        const region = regionId != 0 ? regionId : "";
        console.log(`search = ${search}
       - desde = ${desde} - 
       hasta = ${hasta} - 
       estado = ${estado} - 
       cliente = ${cliente} - 
       region = ${region}`);
        if (isNaN(pageNumber) || pageNumber < 1) {
            return res
                .status(400)
                .json({ error: "El parámetro 'page' debe ser un número positivo." });
        }
        const offset = (pageNumber - 1) * limite;
        // Construcción de la condición de búsqueda en Pedido
        const pedidoWhere = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (search &&
            search.trim() && { codigo: { [sequelize_1.Op.like]: `%${search.trim()}%` } })), (estado && { estado_pedidos_id: estado })), (cliente && { cliente_id: cliente })), (desde && { createdAt: { [sequelize_1.Op.gte]: desde } })), (hasta && { createdAt: { [sequelize_1.Op.lte]: hasta } }));
        const regionWhere = Object.assign({}, (region && { region_id: region }));
        const { rows: pedidos, count: total } = yield Pedido_1.default.findAndCountAll({
            where: pedidoWhere,
            include: [
                { model: Empleado_1.default },
                { model: Cliente_1.default, include: [{ model: Persona_1.default }] },
                { model: EstadoPedido_1.default },
                { model: Delivery_1.default },
                { model: GuiaDespacho_1.default },
                { model: ComprobanteVenta_1.default },
                {
                    model: Direccion_1.default,
                    where: regionWhere,
                    include: [{ model: Region_1.default }],
                },
            ],
            limit: limite,
            offset,
            distinct: true,
            order: [["id", "DESC"]],
        });
        res.status(200).json({
            pedidos,
            total,
            page: pageNumber,
            totalPages: Math.ceil(total / limite),
        });
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
    const { empleados_id, clientes_id, estado_pedidos_id, deliverys_id, monto_total, documento_usa_id, n_despacho_chile, comprobante_ventas_id, direccion_id, } = req.body;
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
            direccion_id,
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
    const { empleados_id, clientes_id, estado_pedidos_id, deliverys_id, monto_total, guia_despacho_id, tracking_number, comprobante_ventas_id, direccion_id, } = req.body;
    try {
        const pedido = yield Pedido_1.default.findByPk(id);
        if (pedido) {
            yield pedido.update({
                empleados_id,
                clientes_id,
                estado_pedidos_id,
                deliverys_id,
                monto_total,
                guia_despacho_id,
                tracking_number,
                comprobante_ventas_id,
                direccion_id,
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
const getPedidosByGuiaDespachoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pedido = yield Pedido_1.default.findAll({
            where: {
                guia_despacho_id: id,
            },
        });
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
exports.getPedidosByGuiaDespachoId = getPedidosByGuiaDespachoId;
const getPedidosByComprobanteVentaId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const pedido = yield Pedido_1.default.findAll({
            where: {
                comprobante_ventas_id: id,
            },
            include: [
                { model: Empleado_1.default },
                { model: Cliente_1.default, include: [{ model: Persona_1.default }] },
                { model: EstadoPedido_1.default },
                { model: Delivery_1.default },
                { model: GuiaDespacho_1.default },
                { model: ComprobanteVenta_1.default },
                {
                    model: Direccion_1.default,
                    include: [{ model: Region_1.default }, { model: Comuna_1.default }],
                },
            ],
        });
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
exports.getPedidosByComprobanteVentaId = getPedidosByComprobanteVentaId;
//# sourceMappingURL=pedidos.js.map
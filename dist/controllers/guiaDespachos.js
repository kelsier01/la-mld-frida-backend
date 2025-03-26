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
exports.deleteGuiaDespacho = exports.updateGuiaDespacho = exports.createGuiaDespacho = exports.getGuiaDespachoById = exports.getAllGuiasDespacho = void 0;
const GuiaDespacho_1 = __importDefault(require("../models/GuiaDespacho"));
const Estado_1 = __importDefault(require("../models/Estado"));
const Region_1 = __importDefault(require("../models/Region"));
const Pedido_1 = __importDefault(require("../models/Pedido"));
const Direccion_1 = __importDefault(require("../models/Direccion"));
const sequelize_1 = require("sequelize");
const getAllGuiasDespacho = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search = "", page = "1", estadoId, regionId, limit = 10, } = req.query;
        const pageNumber = Number(page);
        const estado = estadoId != 0 ? estadoId : "";
        const region = regionId != 0 ? regionId : "";
        console.log(`estado = ${estado} - region = ${region}`);
        if (isNaN(pageNumber) || pageNumber < 1) {
            return res
                .status(400)
                .json({ error: "El parámetro 'page' debe ser un número positivo." });
        }
        const offset = (pageNumber - 1) * Number(limit);
        const limite = Number(limit);
        // Construcción de la condición de búsqueda en GuiaDespacho
        const guiaDespachoWhere = Object.assign(Object.assign(Object.assign({}, (search &&
            search.trim() && { codigo: { [sequelize_1.Op.like]: `%${search.trim()}%` } })), (estado && { estados_id: estado })), { estados_id: { [sequelize_1.Op.ne]: 2 } // Excluir registros donde estados_id es igual a 0
         });
        // Construcción de la condición de búsqueda en Direccion por región
        const direccionWhere = Object.assign({}, (region && { region_id: region }));
        const { rows: guiasDespacho, count: total } = yield GuiaDespacho_1.default.findAndCountAll({
            where: guiaDespachoWhere,
            include: [
                {
                    model: Estado_1.default,
                },
                {
                    model: Pedido_1.default,
                    include: [
                        {
                            model: Direccion_1.default,
                            where: Object.keys(direccionWhere).length > 0 ? direccionWhere : undefined,
                            include: [
                                {
                                    model: Region_1.default,
                                }
                            ]
                        }
                    ]
                }
            ],
            order: [["id", "DESC"]],
            limit: limite,
            offset,
            distinct: true,
        });
        res.status(200).json({
            guiasDespacho,
            total,
            page: pageNumber,
            totalPages: Math.ceil(total / Number(limit)),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error al obtener las guías de despacho"
        });
    }
});
exports.getAllGuiasDespacho = getAllGuiasDespacho;
const getGuiaDespachoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const guiaDespacho = yield GuiaDespacho_1.default.findByPk(id, {
            include: [
                {
                    model: Estado_1.default,
                },
                {
                    model: Pedido_1.default,
                    include: [
                        {
                            model: Direccion_1.default,
                            include: [
                                {
                                    model: Region_1.default,
                                }
                            ]
                        }
                    ]
                }
            ],
        });
        if (guiaDespacho) {
            res.status(200).json(guiaDespacho);
        }
        else {
            res.status(404).json({ message: "Guía de despacho no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener la guía de despacho", error });
    }
});
exports.getGuiaDespachoById = getGuiaDespachoById;
const createGuiaDespacho = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { codigo, estados_id, subtotal, insurage, other, total } = req.body;
    try {
        const nuevaGuiaDespacho = yield GuiaDespacho_1.default.create({
            codigo,
            estados_id,
            subtotal,
            insurage,
            other,
            total
        });
        res.status(201).json(nuevaGuiaDespacho);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al crear la guía de despacho", error });
    }
});
exports.createGuiaDespacho = createGuiaDespacho;
const updateGuiaDespacho = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { codigo, estados_id, subtotal, insurage, other, total } = req.body;
    try {
        const guiaDespacho = yield GuiaDespacho_1.default.findByPk(id);
        if (guiaDespacho) {
            yield guiaDespacho.update({
                codigo,
                estados_id,
                subtotal,
                insurage,
                other,
                total
            });
            res.status(200).json(guiaDespacho);
        }
        else {
            res.status(404).json({ message: "Guía de despacho no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al actualizar la guía de despacho", error });
    }
});
exports.updateGuiaDespacho = updateGuiaDespacho;
const deleteGuiaDespacho = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const guiaDespacho = yield GuiaDespacho_1.default.findByPk(id);
        if (guiaDespacho) {
            yield guiaDespacho.destroy();
            res
                .status(200)
                .json({ message: "Guía de despacho eliminada correctamente" });
        }
        else {
            res.status(404).json({ message: "Guía de despacho no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al eliminar la guía de despacho", error });
    }
});
exports.deleteGuiaDespacho = deleteGuiaDespacho;
//# sourceMappingURL=guiaDespachos.js.map
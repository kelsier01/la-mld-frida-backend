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
exports.deleteMarca = exports.updateMarca = exports.createMarca = exports.getMarcaById = exports.getMarcas = exports.getAllMarcas = void 0;
const Marca_1 = __importDefault(require("../models/Marca"));
const sequelize_1 = require("sequelize");
const getAllMarcas = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search = "", page = "1", limit = 20, } = req.query;
        // Validación de la paginación
        const pageNumber = Number(page);
        if (isNaN(pageNumber) || pageNumber < 1) {
            return res
                .status(400)
                .json({ error: "El parámetro 'page' debe ser un número positivo." });
        }
        const offset = (pageNumber - 1) * Number(limit);
        const limite = Number(limit);
        // Construcción de la condición de búsqueda en Persona
        const marcaWhere = Object.assign({ eliminado: {
                [sequelize_1.Op.ne]: 1,
            } }, (search ? { nombre: { [sequelize_1.Op.like]: `%${search}%` } } : {}));
        // Ejecución de la consulta con Sequelize
        const { rows: marcas, count: total } = yield Marca_1.default.findAndCountAll({
            where: marcaWhere,
            limit: limite,
            offset,
            distinct: true,
            order: [["nombre", "ASC"]], // ASC para orden ascendente, DESC para descendente
        });
        console.log("Query:", Marca_1.default.findAndCountAll({
            where: marcaWhere,
            limit: limite,
            offset,
            distinct: true,
            order: [["nombre", "ASC"]],
        }).toString());
        // const marcas = await Marca.findAll();
        return res.json({
            marcas,
            total,
            page: pageNumber,
            totalPages: Math.ceil(total / Number(limit)),
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las marcas", error });
        next(error); // Delegar el error al middleware de manejo de errores
    }
});
exports.getAllMarcas = getAllMarcas;
const getMarcas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marcas = yield Marca_1.default.findAll({
            where: {
                eliminado: {
                    [sequelize_1.Op.ne]: 1, // Op.ne significa "not equal" (distinto de)
                },
            },
            order: [["nombre", "ASC"]], // ASC para orden ascendente, DESC para descendente
        });
        console.log("Query:", Marca_1.default.findAll({
            where: {
                eliminado: {
                    [sequelize_1.Op.ne]: 1,
                },
            },
            order: [["nombre", "ASC"]],
        }).toString());
        res.status(200).json(marcas);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las marcas", error });
    }
});
exports.getMarcas = getMarcas;
const getMarcaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const marca = yield Marca_1.default.findByPk(id);
        if (marca) {
            res.status(200).json(marca);
        }
        else {
            res.status(404).json({ message: "Marca no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener la marca", error });
    }
});
exports.getMarcaById = getMarcaById;
const createMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    try {
        const nuevaMarca = yield Marca_1.default.create({ nombre });
        res.status(201).json(nuevaMarca);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear la marca", error });
    }
});
exports.createMarca = createMarca;
const updateMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const marca = yield Marca_1.default.findByPk(id);
        if (marca) {
            yield marca.update({ nombre });
            res.status(200).json(marca);
        }
        else {
            res.status(404).json({ message: "Marca no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar la marca", error });
    }
});
exports.updateMarca = updateMarca;
const deleteMarca = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const marca = yield Marca_1.default.findByPk(id);
        if (marca) {
            // await marca.destroy();
            res.status(200).json({ message: "Marca eliminada correctamente" });
        }
        else {
            res.status(404).json({ message: "Marca no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la marca", error });
    }
});
exports.deleteMarca = deleteMarca;
//# sourceMappingURL=marcas.js.map
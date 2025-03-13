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
exports.deleteCliente = exports.updateCliente = exports.createCliente = exports.getClienteById = exports.getAllClientes = void 0;
const Cliente_1 = __importDefault(require("../models/Cliente"));
const Persona_1 = __importDefault(require("../models/Persona"));
const Direccion_1 = __importDefault(require("../models/Direccion"));
const sequelize_1 = require("sequelize");
const Region_1 = __importDefault(require("../models/Region"));
const Comuna_1 = __importDefault(require("../models/Comuna"));
const getAllClientes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search = "", page = "1", region, limit = 10, } = req.query;
        // Validación de la paginación
        const pageNumber = Number(page);
        let regionNumber = region;
        let validTrue = true;
        if (region == 0) {
            regionNumber = undefined;
            validTrue = false;
        }
        if (isNaN(pageNumber) || pageNumber < 1) {
            return res
                .status(400)
                .json({ error: "El parámetro 'page' debe ser un número positivo." });
        }
        const offset = (pageNumber - 1) * Number(limit);
        const limite = Number(limit);
        // Construcción de la condición de búsqueda en Persona
        const personaWhere = search
            ? {
                [sequelize_1.Op.or]: [
                    { nombre: { [sequelize_1.Op.like]: `%${search}%` } },
                    { n_identificacion: { [sequelize_1.Op.like]: `%${search}%` } },
                ],
            }
            : {};
        // Construcción de la condición de búsqueda en Direccion
        const direccionWhere = Object.assign({}, (regionNumber && { region_id: regionNumber }));
        // Ejecución de la consulta con Sequelize
        const { rows: clientes, count: total } = yield Cliente_1.default.findAndCountAll({
            include: [
                {
                    model: Persona_1.default,
                    as: "persona", // Asegurar que coincida con la relación definida en Sequelize
                    where: personaWhere,
                    required: true, // INNER JOIN para que solo traiga clientes con Persona asociada
                },
                {
                    model: Direccion_1.default,
                    as: "Direccions",
                    where: direccionWhere,
                    required: false, // INNER JOIN para que solo traiga clientes con Persona asociada
                    include: [
                        { model: Region_1.default, required: false },
                        { model: Comuna_1.default, required: false },
                    ],
                },
            ],
            limit: limite,
            offset,
            distinct: true,
        });
        return res.json({
            clientes,
            total,
            page: pageNumber,
            totalPages: Math.ceil(total / Number(limit)),
        });
    }
    catch (error) {
        console.error("Error al obtener clientes:", error);
        next(error); // Delegar el error al middleware de manejo de errores
    }
});
exports.getAllClientes = getAllClientes;
const getClienteById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cliente = yield Cliente_1.default.findByPk(id, {
            include: [Persona_1.default, Direccion_1.default],
        });
        if (cliente) {
            res.status(200).json(cliente);
        }
        else {
            res.status(404).json({ message: "Cliente no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el cliente", error });
    }
});
exports.getClienteById = getClienteById;
const createCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { n_identificacion, nombre, correo, fono, direccion, cta_instagram, region_id, comuna_id } = req.body;
    try {
        // Buscar si la persona ya existe por n_identificacion
        let persona = yield Persona_1.default.findOne({ where: { n_identificacion } });
        let region = yield Region_1.default.findByPk(region_id);
        let comuna = yield Comuna_1.default.findByPk(comuna_id);
        if (persona) {
            // Verificar si la persona ya está asociada a un cliente
            const clienteExistente = yield Cliente_1.default.findOne({
                where: { personas_id: persona.id },
            });
            if (clienteExistente) {
                return res
                    .status(400)
                    .json({ message: "La persona ya está registrada como cliente" });
            }
            // Si la persona existe pero no es cliente, crear el cliente con la ID de la persona existente
            const nuevoCliente = yield Cliente_1.default.create({
                personas_id: persona.id,
                cta_instagram,
                eliminado: 0
            });
            // Crear la dirección del cliente
            // Crear la dirección del cliente
            const nuevaDireccion = yield Direccion_1.default.create({
                clientes_id: nuevoCliente.id,
                direccion,
                region_id,
                comuna_id,
            });
            return res.status(201).json({ nuevoCliente, nuevaDireccion, persona, region, comuna });
        }
        else {
            // Si la persona no existe, la creamos
            persona = yield Persona_1.default.create({
                nombre,
                correo,
                n_identificacion,
                fono,
            });
            // Crear el cliente con la persona recién creada
            const nuevoCliente = yield Cliente_1.default.create({
                personas_id: persona.id,
                cta_instagram,
                eliminado: 0
            });
            // Crear la dirección del cliente
            const nuevaDireccion = yield Direccion_1.default.create({
                clientes_id: nuevoCliente.id,
                direccion,
                region_id,
                comuna_id,
            });
            res.status(201).json({ nuevoCliente, nuevaDireccion, persona, region, comuna });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el cliente", error });
    }
});
exports.createCliente = createCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, n_identificacion, correo, fono, cta_instagram } = req.body;
    try {
        const cliente = yield Cliente_1.default.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }
        // Buscar la persona asociada
        const persona = yield Persona_1.default.findByPk(cliente.personas_id);
        if (!persona) {
            return res.status(404).json({ message: "Persona no encontrada" });
        }
        // Actualizar los datos de la persona
        yield persona.update({ nombre, n_identificacion, correo, fono });
        // Actualizar los datos del cliente
        yield cliente.update({ cta_instagram });
        res.status(200).json(cliente);
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el cliente", error });
    }
});
exports.updateCliente = updateCliente;
const deleteCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const cliente = yield Cliente_1.default.findByPk(id);
        if (cliente) {
            yield cliente.update({ eliminado: true });
            res.status(200).json({ message: "Cliente eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Cliente no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el cliente", error });
    }
});
exports.deleteCliente = deleteCliente;
//# sourceMappingURL=clientes.js.map
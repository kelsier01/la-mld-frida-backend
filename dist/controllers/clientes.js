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
        let regionNumber = region == 0 ? undefined : Number(region);
        let validRegion = region == 0 ? false : true;
        const offset = (pageNumber - 1) * Number(limit);
        let limite = Number(limit);
        if (isNaN(pageNumber) || pageNumber < 1) {
            return res
                .status(400)
                .json({ error: "El parámetro 'page' debe ser un número positivo." });
        }
        if (search || region) {
            limite = 100;
        }
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
        console.log("direccionWhere", direccionWhere);
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
                    required: validRegion, // INNER JOIN para que solo traiga clientes con Persona asociada
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
            include: [
                { model: Persona_1.default },
                {
                    model: Direccion_1.default,
                    required: false,
                    include: [
                        { model: Region_1.default, required: true },
                        { model: Comuna_1.default, required: true },
                    ],
                },
            ],
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
    const { n_identificacion, nombre, correo, fono, direccion, cta_instagram, region_id, comuna_id, } = req.body;
    // 1. Validación básica de entrada
    if (!n_identificacion || !nombre || !correo || !direccion || region_id == null || comuna_id == null) {
        return res.status(400).json({ message: "Faltan campos obligatorios (n_identificacion, nombre, correo, direccion, region_id, comuna_id)." });
    }
    try {
        // 3. Buscar la Persona por n_identificacion dentro de la transacción
        let persona = yield Persona_1.default.findOne({
            where: { n_identificacion },
        });
        let personaCreada = false;
        if (persona) {
            // Si la persona existe, verificar si ya es un cliente
            const clienteExistente = yield Cliente_1.default.findOne({
                where: { personas_id: persona.id },
            });
            if (clienteExistente) {
                // Si ya es cliente, revertir la transacción y enviar error
                return res.status(400).json({ message: "La persona con esta identificación ya está registrada como cliente." });
            }
            // La persona existe pero NO es cliente. Usaremos esta persona para crear el cliente.
        }
        else {
            // Si la persona no existe, crearla dentro de la transacción
            persona = yield Persona_1.default.create({
                nombre,
                correo,
                n_identificacion,
                fono,
            });
            personaCreada = true;
        }
        // En este punto, 'persona' es una instancia válida, ya sea encontrada o recién creada.
        // Y sabemos que esta persona aún no tiene un registro de Cliente asociado.
        // 4. Crear el registro de Cliente asociado a la Persona
        const nuevoCliente = yield Cliente_1.default.create({
            personas_id: persona.id,
            cta_instagram,
            eliminado: false, // Es más claro usar un booleano en lugar de 0/1 si representa un estado binario
        });
        // 5. Crear la Dirección asociada al nuevo Cliente
        const nuevaDireccion = yield Direccion_1.default.create({
            clientes_id: nuevoCliente.id,
            direccion,
            region_id,
            comuna_id,
        });
        const region = yield Region_1.default.findByPk(region_id);
        const comuna = yield Comuna_1.default.findByPk(comuna_id);
        // 8. Enviar la respuesta exitosa
        return res.status(201).json({
            nuevoCliente: nuevoCliente,
            nuevaDireccion: nuevaDireccion,
            persona: persona,
            region: region,
            comuna: comuna,
        });
    }
    catch (error) {
        console.error("Error al crear el cliente:", error); // Log del error en el servidor
        return res.status(500).json({
            message: "Ocurrió un error interno al intentar crear el cliente.",
            error: error.message, // Envía el mensaje de error para depuración, considera ser menos detallado en producción
        });
    }
});
exports.createCliente = createCliente;
const updateCliente = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre, n_identificacion, correo, fono, cta_instagram, eliminado } = req.body;
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
        yield cliente.update({ cta_instagram, eliminado });
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
            yield cliente.update({ eliminado: 1 });
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
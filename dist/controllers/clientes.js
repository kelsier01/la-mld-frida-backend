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
// export const getAllClientes = async (req: Request, res: Response) => {
//   try {
//     const clientes = await Cliente.findAll({
//       include: [Persona, Direccion],
//     });
//     res.status(200).json(clientes);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener los clientes", error });
//   }
// };
const getAllClientes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, page = "1", region } = req.query;
    console.log("search", search);
    // Convertir 'page' a número y establecer un valor predeterminado de 1 si no es válido
    const pageNumber = isNaN(Number(page)) ? 1 : Number(page);
    // Configuración de la paginación
    const limit = 10; // Número de clientes por página
    const offset = (pageNumber - 1) * limit;
    // Construir la condición de búsqueda
    const whereCondition = Object.assign({}, (search && {
        [sequelize_1.Op.or]: [
            { "Persona.nombre": { [sequelize_1.Op.like]: `%${search}%` } }, // Filtrado por nombre
            { "Persona.n_identificacion": { [sequelize_1.Op.like]: `%${search}%` } }, // Filtrado por n_identificacion
        ],
    }));
    console.log("where", whereCondition);
    try {
        const { rows, count } = yield Cliente_1.default.findAndCountAll({
            where: whereCondition,
            include: [{ model: Persona_1.default }, { model: Direccion_1.default }],
            limit,
            offset,
        });
        console.log("rows", rows);
        res.json({
            clientes: rows,
            total: count,
            page: pageNumber,
            totalPages: Math.ceil(count / limit),
        });
    }
    catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).send("Error al obtener clientes");
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
    const { n_identificacion, nombre, correo, fono, direccion, cta_instagram } = req.body;
    try {
        // Buscar si la persona ya existe por n_identificacion
        let persona = yield Persona_1.default.findOne({ where: { n_identificacion } });
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
            });
            return res.status(201).json(nuevoCliente);
        }
        // Si la persona no existe, la creamos
        persona = yield Persona_1.default.create({
            n_identificacion,
            nombre,
            correo,
            fono,
        });
        // Crear el cliente con la persona recién creada
        const nuevoCliente = yield Cliente_1.default.create({
            personas_id: persona.id,
            cta_instagram,
        });
        res.status(201).json(nuevoCliente);
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
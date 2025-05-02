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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsuario = exports.deleteUsuario = exports.updateUsuario = exports.getUsarioByUid = exports.getUsuarioById = exports.getAllUsuarios = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Persona_1 = __importDefault(require("../models/Persona"));
const uuid_1 = require("uuid"); //LIBRERIA UUID
const Empleado_1 = __importDefault(require("../models/Empleado"));
const Rol_1 = __importDefault(require("../models/Rol"));
const connection_1 = __importDefault(require("../BD/connection")); // Tu conexión Sequelize
const sequelize_1 = require("sequelize");
const getAllUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search = "", page = "1", rol, limit = 10, } = req.query;
        // Validación de la paginación
        const pageNumber = Number(page);
        let rolNumber = rol == 0 ? undefined : Number(rol);
        let validRol = rol == 0 ? false : true;
        const offset = (pageNumber - 1) * Number(limit);
        let limite = Number(limit);
        if (isNaN(pageNumber) || pageNumber < 1) {
            return res
                .status(400)
                .json({ error: "El parámetro 'page' debe ser un número positivo." });
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
        const rolWhere = Object.assign({}, (rolNumber && { roles_id: rolNumber }));
        const { rows: usuarios, count: total } = yield Usuario_1.default.findAndCountAll({
            where: rolWhere,
            include: [
                {
                    model: Rol_1.default,
                },
                {
                    model: Empleado_1.default,
                    include: [
                        {
                            model: Persona_1.default,
                            where: personaWhere,
                            required: true, // INNER JOIN para que solo traiga clientes con Persona asociada
                        },
                    ],
                },
            ],
            limit: limite,
            offset,
        });
        return res.json({
            usuarios,
            total,
            page: pageNumber,
            totalPages: Math.ceil(total / Number(limit)),
        });
        res.status(200).json(usuarios);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
});
exports.getAllUsuarios = getAllUsuarios;
const getUsuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield Usuario_1.default.findByPk(id, {
            include: [
                {
                    model: Rol_1.default,
                },
                {
                    model: Empleado_1.default,
                    include: [Persona_1.default],
                },
            ],
        });
        if (usuario) {
            res.status(200).json(usuario);
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el usuario", error });
    }
});
exports.getUsuarioById = getUsuarioById;
const getUsarioByUid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.params;
    const user = yield Usuario_1.default.findOne({
        where: { uid },
        include: [
            {
                model: Rol_1.default,
            },
            {
                model: Empleado_1.default,
                include: [Persona_1.default],
            },
        ],
    });
    if (user) {
        // if(user.personas.profesionales.habilitado){
        // res.json(user);
        res.json(user);
        // }else{
        //   res.status(404).json({
        //     msg: `El profesional ${user.personas.nombre} se encuentra deshabilitado`,
        //   });
        // }
    }
    else {
        res.status(404).json({
            msg: `No existe el usuario con la id ${uid}`,
        });
    }
});
exports.getUsarioByUid = getUsarioByUid;
const updateUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { username, password, isActive, roles_id, nombre, correo, n_identificacion, fono, } = req.body;
    console.log("entro", req.body);
    // Iniciar una transacción
    const t = yield connection_1.default.transaction();
    try {
        const usuario = yield Usuario_1.default.findByPk(id, { transaction: t });
        if (!usuario) {
            yield t.rollback();
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        // Construcción dinámica de los datos a actualizar
        const updateUsuarioData = {};
        if (username)
            updateUsuarioData.username = username;
        if (password)
            updateUsuarioData.password = password;
        if (isActive !== undefined)
            updateUsuarioData.isActive = isActive;
        if (roles_id)
            updateUsuarioData.roles_id = roles_id;
        yield usuario.update(updateUsuarioData, { transaction: t });
        // Buscar el Empleado vinculado al Usuario
        const empleado = yield Empleado_1.default.findOne({
            where: { usuarios_id: id },
            transaction: t,
        });
        if (empleado) {
            const persona = yield Persona_1.default.findByPk(empleado.personas_id, {
                transaction: t,
            });
            if (persona) {
                const updatePersonaData = {};
                if (nombre)
                    updatePersonaData.nombre = nombre;
                if (correo)
                    updatePersonaData.correo = correo;
                if (n_identificacion)
                    updatePersonaData.n_identificacion = n_identificacion;
                if (fono)
                    updatePersonaData.fono = fono;
                yield persona.update(updatePersonaData, { transaction: t });
            }
        }
        // Confirmar la transacción
        yield t.commit();
        return res
            .status(200)
            .json({ message: "Usuario y Persona actualizados correctamente" });
    }
    catch (error) {
        // Revertir cambios en caso de error
        yield t.rollback();
        console.error("Error en updateUsuario:", error);
        return res.status(500).json({ message: "Error al actualizar", error });
    }
});
exports.updateUsuario = updateUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield Usuario_1.default.findByPk(id);
        if (usuario) {
            // await usuario.destroy();
            yield usuario.update({ isActive: false });
            res.status(200).json({ message: "Usuario eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el usuario", error });
    }
});
exports.deleteUsuario = deleteUsuario;
const createUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, roles_id, nombre, correo, n_identificacion, fono } = req.body;
    // Validación de campos requeridos
    if (!n_identificacion || !password || !roles_id) {
        return res.status(400).json({
            message: "Campos obligatorios: n_identificacion, password, roles_id",
        });
    }
    const username = n_identificacion;
    const t = yield connection_1.default.transaction();
    try {
        // 1. Búsqueda/creación de Persona
        let persona = null;
        const personaExistente = yield Persona_1.default.findOne({
            where: { n_identificacion },
            transaction: t,
        });
        if (personaExistente) {
            persona = personaExistente;
            // 2. Verificar usuario existente
            const usuarioExistente = yield Usuario_1.default.findOne({
                where: { username },
                transaction: t,
            });
            if (usuarioExistente) {
                yield t.rollback();
                return res.status(409).json({
                    message: "La persona ya tiene un usuario registrado",
                });
            }
        }
        else {
            // Crear nueva persona si no existe
            persona = yield Persona_1.default.create({
                nombre,
                correo,
                n_identificacion,
                fono,
            }, { transaction: t });
        }
        // 3. Creación de Usuario y Empleado (común para ambos casos)
        const uuid = (0, uuid_1.v4)().slice(0, 8);
        const salto = bcryptjs_1.default.genSaltSync();
        const psswd = bcryptjs_1.default.hashSync(password, salto);
        const nuevoUsuario = yield Usuario_1.default.create({
            username,
            password: psswd,
            uid: uuid,
            isActive: 1,
            roles_id,
        }, { transaction: t });
        yield Empleado_1.default.create({
            personas_id: persona.id,
            usuarios_id: nuevoUsuario.id,
            eliminado: false, // Campo requerido según modelo
        }, { transaction: t });
        yield t.commit();
        const { password: _ } = nuevoUsuario, usuario = __rest(nuevoUsuario, ["password"]);
        return res.status(201).json(usuario);
    }
    catch (error) {
        yield t.rollback();
        console.error("Error en createUsuario:", error);
        return res.status(500).json({
            message: "Error en el servidor al crear el usuario",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
});
exports.createUsuario = createUsuario;
//# sourceMappingURL=usuarios.js.map
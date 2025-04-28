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
exports.createUsuario = exports.deleteUsuario = exports.updateUsuario = exports.getUsarioByUid = exports.getUsuarioById = exports.getAllUsuarios = void 0;
const Usuario_1 = __importDefault(require("../models/Usuario"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Persona_1 = __importDefault(require("../models/Persona"));
const uuid_1 = require("uuid"); //LIBRERIA UUID
const Empleado_1 = __importDefault(require("../models/Empleado"));
const Rol_1 = __importDefault(require("../models/Rol"));
const connection_1 = __importDefault(require("../BD/connection")); // Tu conexión Sequelize
const getAllUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarios = yield Usuario_1.default.findAll({
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
    const username = n_identificacion;
    const t = yield connection_1.default.transaction();
    try {
        // Buscar si ya existe la persona
        const personaExistente = yield Persona_1.default.findOne({
            where: { n_identificacion },
            transaction: t,
        });
        // Si existe la persona
        if (personaExistente) {
            // Verificar si también es usuario
            const usuarioExistente = yield Usuario_1.default.findOne({
                where: { username },
                transaction: t,
            });
            // Si ya existe como usuario también, error
            if (usuarioExistente) {
                yield t.rollback();
                return res.status(400).json({
                    message: "La persona ya está registrada como usuario",
                });
            }
            // Si solo existe la persona: crear usuario y empleado
            const uuid = (0, uuid_1.v4)().slice(0, 8);
            const psswd = bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync());
            const nuevoUsuario = yield Usuario_1.default.create({
                username,
                password: psswd,
                uid: uuid,
                isActive: 1,
                roles_id,
            }, { transaction: t });
            yield Empleado_1.default.create({
                personas_id: personaExistente.id,
                usuarios_id: nuevoUsuario.id,
            }, { transaction: t });
            yield t.commit();
            return res.status(201).json({
                message: "Usuario y Empleado creados para persona existente",
                usuario: nuevoUsuario,
            });
        }
        // Si no existe la persona, crear todo desde cero
        const nuevaPersona = yield Persona_1.default.create({
            nombre,
            correo,
            n_identificacion,
            fono,
        }, { transaction: t });
        const uuid = (0, uuid_1.v4)().slice(0, 8);
        const psswd = bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync());
        const nuevoUsuario = yield Usuario_1.default.create({
            username,
            password: psswd,
            uid: uuid,
            isActive: 1,
            roles_id,
        }, { transaction: t });
        yield Empleado_1.default.create({
            personas_id: nuevaPersona.id,
            usuarios_id: nuevoUsuario.id,
        }, { transaction: t });
        yield t.commit();
        res.status(201).json({
            message: "Persona, Usuario y Empleado creados correctamente",
            usuario: nuevoUsuario,
        });
    }
    catch (error) {
        yield t.rollback();
        console.error("Error en createUsuario:", error);
        res.status(500).json({
            message: "Error al crear el usuario",
            error,
        });
    }
});
exports.createUsuario = createUsuario;
//# sourceMappingURL=usuarios.js.map
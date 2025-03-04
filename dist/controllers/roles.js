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
exports.deleteRol = exports.updateRol = exports.createRol = exports.getRolById = exports.getAllRoles = void 0;
const Rol_1 = __importDefault(require("../models/Rol"));
const getAllRoles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roles = yield Rol_1.default.findAll();
        res.status(200).json(roles);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los roles", error });
    }
});
exports.getAllRoles = getAllRoles;
const getRolById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rol = yield Rol_1.default.findByPk(id);
        if (rol) {
            res.status(200).json(rol);
        }
        else {
            res.status(404).json({ message: "Rol no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el rol", error });
    }
});
exports.getRolById = getRolById;
const createRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { rol } = req.body;
    try {
        const nuevoRol = yield Rol_1.default.create({ rol });
        res.status(201).json(nuevoRol);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el rol", error });
    }
});
exports.createRol = createRol;
const updateRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { rol } = req.body;
    try {
        const rolExistente = yield Rol_1.default.findByPk(id);
        if (rolExistente) {
            yield rolExistente.update({ rol });
            res.status(200).json(rolExistente);
        }
        else {
            res.status(404).json({ message: "Rol no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el rol", error });
    }
});
exports.updateRol = updateRol;
const deleteRol = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const rol = yield Rol_1.default.findByPk(id);
        if (rol) {
            // await rol.destroy();
            res.status(200).json({ message: "Rol eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Rol no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el rol", error });
    }
});
exports.deleteRol = deleteRol;
//# sourceMappingURL=roles.js.map
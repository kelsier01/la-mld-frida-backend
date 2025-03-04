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
exports.deleteEmpleado = exports.updateEmpleado = exports.createEmpleado = exports.getEmpleadoById = exports.getAllEmpleados = void 0;
const Empleado_1 = __importDefault(require("../models/Empleado"));
const getAllEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const empleados = yield Empleado_1.default.findAll();
        res.status(200).json(empleados);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los empleados", error });
    }
});
exports.getAllEmpleados = getAllEmpleados;
const getEmpleadoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const empleado = yield Empleado_1.default.findByPk(id);
        if (empleado) {
            res.status(200).json(empleado);
        }
        else {
            res.status(404).json({ message: "Empleado no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el empleado", error });
    }
});
exports.getEmpleadoById = getEmpleadoById;
const createEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { personas_id, usuarios_id } = req.body;
    try {
        const nuevoEmpleado = yield Empleado_1.default.create({
            personas_id,
            usuarios_id,
        });
        res.status(201).json(nuevoEmpleado);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el empleado", error });
    }
});
exports.createEmpleado = createEmpleado;
const updateEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { personas_id, usuarios_id } = req.body;
    try {
        const empleado = yield Empleado_1.default.findByPk(id);
        if (empleado) {
            yield empleado.update({ personas_id, usuarios_id });
            res.status(200).json(empleado);
        }
        else {
            res.status(404).json({ message: "Empleado no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el empleado", error });
    }
});
exports.updateEmpleado = updateEmpleado;
const deleteEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const empleado = yield Empleado_1.default.findByPk(id);
        if (empleado) {
            // await empleado.destroy();
            yield empleado.update({ eliminado: true });
            res.status(200).json({ message: "Empleado eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Empleado no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el empleado", error });
    }
});
exports.deleteEmpleado = deleteEmpleado;
//# sourceMappingURL=empleados.js.map
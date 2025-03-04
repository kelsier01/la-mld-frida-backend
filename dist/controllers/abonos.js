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
exports.deleteAbono = exports.updateAbono = exports.createAbono = exports.getAbonoById = exports.getAllAbonos = void 0;
const Abono_1 = __importDefault(require("../models/Abono"));
const getAllAbonos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const abonos = yield Abono_1.default.findAll();
        res.status(200).json(abonos);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los abonos", error });
    }
});
exports.getAllAbonos = getAllAbonos;
const getAbonoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const abono = yield Abono_1.default.findByPk(id);
        if (abono) {
            res.status(200).json(abono);
        }
        else {
            res.status(404).json({ message: "Abono no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el abono", error });
    }
});
exports.getAbonoById = getAbonoById;
const createAbono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pagos_id, monto, fecha, metodos_pago_id, empleados_id } = req.body;
    try {
        const nuevoAbono = yield Abono_1.default.create({
            pagos_id,
            monto,
            fecha,
            metodos_pago_id,
            empleados_id,
        });
        res.status(201).json(nuevoAbono);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el abono", error });
    }
});
exports.createAbono = createAbono;
const updateAbono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { pagos_id, monto, fecha, metodos_pago_id, empleados_id } = req.body;
    try {
        const abono = yield Abono_1.default.findByPk(id);
        if (abono) {
            yield abono.update({
                pagos_id,
                monto,
                fecha,
                metodos_pago_id,
                empleados_id,
            });
            res.status(200).json(abono);
        }
        else {
            res.status(404).json({ message: "Abono no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el abono", error });
    }
});
exports.updateAbono = updateAbono;
const deleteAbono = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const abono = yield Abono_1.default.findByPk(id);
        if (abono) {
            yield abono.destroy();
            res.status(200).json({ message: "Abono eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Abono no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el abono", error });
    }
});
exports.deleteAbono = deleteAbono;
//# sourceMappingURL=abonos.js.map
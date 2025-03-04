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
exports.deleteDelivery = exports.updateDelivery = exports.createDelivery = exports.getDeliveryById = exports.getAllDeliverys = void 0;
const Delivery_1 = __importDefault(require("../models/Delivery"));
const getAllDeliverys = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deliverys = yield Delivery_1.default.findAll();
        res.status(200).json(deliverys);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los deliverys", error });
    }
});
exports.getAllDeliverys = getAllDeliverys;
const getDeliveryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const delivery = yield Delivery_1.default.findByPk(id);
        if (delivery) {
            res.status(200).json(delivery);
        }
        else {
            res.status(404).json({ message: "Delivery no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el delivery", error });
    }
});
exports.getDeliveryById = getDeliveryById;
const createDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { empresa } = req.body;
    try {
        const nuevoDelivery = yield Delivery_1.default.create({ empresa });
        res.status(201).json(nuevoDelivery);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el delivery", error });
    }
});
exports.createDelivery = createDelivery;
const updateDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { empresa } = req.body;
    try {
        const delivery = yield Delivery_1.default.findByPk(id);
        if (delivery) {
            yield delivery.update({ empresa });
            res.status(200).json(delivery);
        }
        else {
            res.status(404).json({ message: "Delivery no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el delivery", error });
    }
});
exports.updateDelivery = updateDelivery;
const deleteDelivery = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const delivery = yield Delivery_1.default.findByPk(id);
        if (delivery) {
            yield delivery.destroy();
            res.status(200).json({ message: "Delivery eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Delivery no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el delivery", error });
    }
});
exports.deleteDelivery = deleteDelivery;
//# sourceMappingURL=deliverys.js.map
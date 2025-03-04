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
exports.deleteProductoBodega = exports.updateProductoBodega = exports.createProductoBodega = exports.getProductoBodegaById = exports.getAllProductoBodegas = void 0;
const ProductoBodega_1 = __importDefault(require("../models/ProductoBodega"));
const getAllProductoBodegas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productoBodegas = yield ProductoBodega_1.default.findAll();
        res.status(200).json(productoBodegas);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener los productos en bodega", error });
    }
});
exports.getAllProductoBodegas = getAllProductoBodegas;
const getProductoBodegaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productoBodega = yield ProductoBodega_1.default.findByPk(id);
        if (productoBodega) {
            res.status(200).json(productoBodega);
        }
        else {
            res.status(404).json({ message: "Producto en bodega no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener el producto en bodega", error });
    }
});
exports.getProductoBodegaById = getProductoBodegaById;
const createProductoBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productos_id, bodegas_id, stock } = req.body;
    try {
        const nuevoProductoBodega = yield ProductoBodega_1.default.create({
            productos_id,
            bodegas_id,
            stock,
        });
        res.status(201).json(nuevoProductoBodega);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al crear el producto en bodega", error });
    }
});
exports.createProductoBodega = createProductoBodega;
const updateProductoBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { productos_id, bodegas_id, stock } = req.body;
    try {
        const productoBodega = yield ProductoBodega_1.default.findByPk(id);
        if (productoBodega) {
            yield productoBodega.update({
                productos_id,
                bodegas_id,
                stock,
            });
            res.status(200).json(productoBodega);
        }
        else {
            res.status(404).json({ message: "Producto en bodega no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al actualizar el producto en bodega", error });
    }
});
exports.updateProductoBodega = updateProductoBodega;
const deleteProductoBodega = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productoBodega = yield ProductoBodega_1.default.findByPk(id);
        if (productoBodega) {
            yield productoBodega.destroy();
            res
                .status(200)
                .json({ message: "Producto en bodega eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Producto en bodega no encontrado" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al eliminar el producto en bodega", error });
    }
});
exports.deleteProductoBodega = deleteProductoBodega;
//# sourceMappingURL=productoBodegas.js.map
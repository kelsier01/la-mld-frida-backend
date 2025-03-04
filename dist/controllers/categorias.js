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
exports.deleteCategoria = exports.updateCategoria = exports.createCategoria = exports.getCategoriaById = exports.getAllCategorias = void 0;
const Categoria_1 = __importDefault(require("../models/Categoria"));
const getAllCategorias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categorias = yield Categoria_1.default.findAll();
        res.status(200).json(categorias);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las categorías", error });
    }
});
exports.getAllCategorias = getAllCategorias;
const getCategoriaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const categoria = yield Categoria_1.default.findByPk(id);
        if (categoria) {
            res.status(200).json(categoria);
        }
        else {
            res.status(404).json({ message: "Categoría no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener la categoría", error });
    }
});
exports.getCategoriaById = getCategoriaById;
const createCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.body;
    try {
        const nuevaCategoria = yield Categoria_1.default.create({ nombre });
        res.status(201).json(nuevaCategoria);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear la categoría", error });
    }
});
exports.createCategoria = createCategoria;
const updateCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { nombre } = req.body;
    try {
        const categoria = yield Categoria_1.default.findByPk(id);
        if (categoria) {
            yield categoria.update({ nombre });
            res.status(200).json(categoria);
        }
        else {
            res.status(404).json({ message: "Categoría no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al actualizar la categoría", error });
    }
});
exports.updateCategoria = updateCategoria;
const deleteCategoria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const categoria = yield Categoria_1.default.findByPk(id);
        if (categoria) {
            yield categoria.destroy();
            res.status(200).json({ message: "Categoría eliminada correctamente" });
        }
        else {
            res.status(404).json({ message: "Categoría no encontrada" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la categoría", error });
    }
});
exports.deleteCategoria = deleteCategoria;
//# sourceMappingURL=categorias.js.map
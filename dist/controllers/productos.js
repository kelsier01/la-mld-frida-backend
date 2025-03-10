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
exports.deleteProducto = exports.updateProducto = exports.createProducto = exports.getProductoById = exports.getAllProductos = void 0;
const Producto_1 = __importDefault(require("../models/Producto"));
const Categoria_1 = __importDefault(require("../models/Categoria"));
const Marca_1 = __importDefault(require("../models/Marca"));
const ProductoBodega_1 = __importDefault(require("../models/ProductoBodega"));
const ProductoImagen_1 = __importDefault(require("../models/ProductoImagen"));
const Bodega_1 = __importDefault(require("../models/Bodega"));
const sequelize_1 = require("sequelize");
const getAllProductos = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search = "", page = "1", categoriaId, marcasId, bodegaId, limit = 10, } = req.query;
        const pageNumber = Number(page);
<<<<<<< HEAD
=======
        const categoria = categoriaId != 0 ? categoriaId : "";
        const marca = marcasId != 0 ? marcasId : "";
        const bodega = bodegaId != 0 ? bodegaId : "";
        console.log(`categoria = ${categoria} - marca = ${marca} - bodega = ${bodega}`);
>>>>>>> origin/michael
        if (isNaN(pageNumber) || pageNumber < 1) {
            return res
                .status(400)
                .json({ error: "El parámetro 'page' debe ser un número positivo." });
        }
        const offset = (pageNumber - 1) * Number(limit);
        const limite = Number(limit);
        // Construcción de la condición de búsqueda en Persona
        const productoWhere = Object.assign(Object.assign(Object.assign({}, (search &&
<<<<<<< HEAD
            search.trim() && { codigo: { [sequelize_1.Op.like]: `%${search.trim()}%` } })), (categoriaId && { categoria_id: categoriaId })), (marcasId && { marcas_id: marcasId }));
        // Construcción de la condición de búsqueda en Direccion
        const bodegaWhere = Object.assign({}, (bodegaId && { bodegas_id: bodegaId }));
        const productos = yield Producto_1.default.findAll({
=======
            search.trim() && { codigo: { [sequelize_1.Op.like]: `%${search.trim()}%` } })), (categoria && { categoria_id: categoria })), (marca && { marcas_id: marca }));
        // Construcción de la condición de búsqueda en Direccion
        const bodegaWhere = Object.assign({}, (bodega && { bodegas_id: bodega }));
        const { rows: productos, count: total } = yield Producto_1.default.findAndCountAll({
>>>>>>> origin/michael
            where: productoWhere,
            include: [
                {
                    model: Categoria_1.default,
                },
                {
                    model: Marca_1.default,
                },
                { model: ProductoImagen_1.default },
                {
                    model: ProductoBodega_1.default,
                    where: bodegaWhere,
                    include: [
                        {
                            model: Bodega_1.default,
                        },
                    ],
                },
            ],
            limit: limite,
            offset,
<<<<<<< HEAD
=======
            distinct: true,
        });
        res.status(200).json({
            productos,
            total,
            page: pageNumber,
            totalPages: Math.ceil(total / Number(limit)),
>>>>>>> origin/michael
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los productos", error });
    }
});
exports.getAllProductos = getAllProductos;
const getProductoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const producto = yield Producto_1.default.findByPk(id, {
            include: [
                {
                    model: Categoria_1.default,
                },
                {
                    model: Marca_1.default,
<<<<<<< HEAD
                },
                { model: ProductoImagen_1.default,
                },
                { model: ProductoBodega_1.default,
                    include: [
                        {
                            model: Bodega_1.default,
                        }
=======
                    as: "marca_producto",
                },
                { model: ProductoImagen_1.default },
                {
                    model: ProductoBodega_1.default,
                    include: [
                        {
                            model: Bodega_1.default,
                        },
>>>>>>> origin/michael
                    ],
                },
            ],
        });
        if (producto) {
            res.status(200).json(producto);
        }
        else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el producto", error });
    }
});
exports.getProductoById = getProductoById;
const createProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Categoria_id, marcas_id, codigo, nombre, precio_venta, Precio_compra_usd, } = req.body;
    try {
        const nuevoProducto = yield Producto_1.default.create({
            Categoria_id,
            marcas_id,
            codigo,
            nombre,
            precio_venta,
            Precio_compra_usd,
        });
        res.status(201).json(nuevoProducto);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el producto", error });
    }
});
exports.createProducto = createProducto;
const updateProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { Categoria_id, marcas_id, codigo, nombre, precio_venta, Precio_compra_usd, } = req.body;
    try {
        const producto = yield Producto_1.default.findByPk(id);
        if (producto) {
            yield producto.update({
                Categoria_id,
                marcas_id,
                codigo,
                nombre,
                precio_venta,
                Precio_compra_usd,
            });
            res.status(200).json(producto);
        }
        else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el producto", error });
    }
});
exports.updateProducto = updateProducto;
const deleteProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const producto = yield Producto_1.default.findByPk(id);
        if (producto) {
            yield producto.destroy();
            res.status(200).json({ message: "Producto eliminado correctamente" });
        }
        else {
            res.status(404).json({ message: "Producto no encontrado" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el producto", error });
    }
});
exports.deleteProducto = deleteProducto;
//# sourceMappingURL=productos.js.map
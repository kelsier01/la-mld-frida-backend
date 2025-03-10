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
const getAllProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield Producto_1.default.findAll({
            include: [
                {
                    model: Categoria_1.default,
                    as: "categoria_producto",
                },
                {
                    model: Marca_1.default,
                    as: "marca_producto",
                },
                { model: ProductoImagen_1.default,
                    as: "imagenes_producto",
                },
                { model: ProductoBodega_1.default,
                    as: "bodegas_producto",
                    include: [
                        {
                            model: Bodega_1.default,
                            as: "bodega_producto"
                        }
                    ],
                },
            ]
        });
        res.status(200).json(productos);
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
                    as: "categoria_producto",
                },
                {
                    model: Marca_1.default,
                    as: "marca_producto",
                },
                { model: ProductoImagen_1.default,
                    as: "imagenes_producto",
                },
                { model: ProductoBodega_1.default,
                    as: "bodegas_producto",
                    include: [
                        {
                            model: Bodega_1.default,
                            as: "bodega_producto"
                        }
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
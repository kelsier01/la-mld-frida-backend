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
exports.deleteProductoImagen = exports.updateProductoImagen = exports.createProductoImagen = exports.getProductoImagenByPedidoId = exports.getProductoImagenById = exports.getAllProductoImagenes = void 0;
const ProductoImagen_1 = __importDefault(require("../models/ProductoImagen"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("../middlewares/multer")); // Importa el middleware de Multer
// Obtener todas las imágenes de productos
const getAllProductoImagenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productoImagenes = yield ProductoImagen_1.default.findAll();
        res.status(200).json(productoImagenes);
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener las imágenes de productos", error });
    }
});
exports.getAllProductoImagenes = getAllProductoImagenes;
// Obtener una imagen de producto por su ID
const getProductoImagenById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productoImagen = yield ProductoImagen_1.default.findByPk(id);
        if (productoImagen) {
            res.status(200).json(productoImagen);
        }
        else {
            res.status(404).json({ message: "Imagen de producto no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener la imagen de producto", error });
    }
});
exports.getProductoImagenById = getProductoImagenById;
const getProductoImagenByPedidoId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productoImagen = yield ProductoImagen_1.default.findAll({
            where: {
                productos_id: id,
            },
        });
        if (productoImagen) {
            res.status(200).json(productoImagen);
        }
        else {
            res.status(404).json({ message: "Imagen de producto no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener la imagen de producto", error });
    }
});
exports.getProductoImagenByPedidoId = getProductoImagenByPedidoId;
// Crear una nueva imagen de producto
const createProductoImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Usa Multer para manejar la subida de la imagen
    multer_1.default.single("imagen")(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            return res.status(400).json({ message: "Error al subir la imagen", error: err });
        }
        const { productos_id, nombre } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "No se subió ninguna imagen." });
        }
        // Ruta temporal del archivo subido
        const tempFilePath = req.file.path;
        // Ruta definitiva en la carpeta pública de la API
        const publicPath = path_1.default.join("dist/public/images", req.file.filename);
        // Mueve el archivo a la carpeta pública
        fs_1.default.rename(tempFilePath, publicPath, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.error("Error al mover la imagen:", err);
                return res.status(500).json({ message: "Error al guardar la imagen." });
            }
            // URL pública de la imagen
            const imageUrl = `/images/${req.file.filename}`;
            try {
                // Guarda la URL en la base de datos
                const nuevaProductoImagen = yield ProductoImagen_1.default.create({
                    productos_id,
                    nombre,
                    url: imageUrl,
                });
                res.status(201).json(nuevaProductoImagen);
            }
            catch (error) {
                res.status(500).json({ message: "Error al crear la imagen de producto", error });
            }
        }));
    }));
});
exports.createProductoImagen = createProductoImagen;
// Actualizar una imagen de producto
const updateProductoImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { productos_id, nombre, url } = req.body;
    try {
        const productoImagen = yield ProductoImagen_1.default.findByPk(id);
        if (productoImagen) {
            yield productoImagen.update({
                productos_id,
                nombre,
                url,
            });
            res.status(200).json(productoImagen);
        }
        else {
            res.status(404).json({ message: "Imagen de producto no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al actualizar la imagen de producto", error });
    }
});
exports.updateProductoImagen = updateProductoImagen;
// Eliminar una imagen de producto
const deleteProductoImagen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const productoImagen = yield ProductoImagen_1.default.findByPk(id);
        if (productoImagen) {
            // Elimina la imagen del sistema de archivos
            const imagePath = path_1.default.join(__dirname, "../public/images", productoImagen.url.split("/images/")[1]);
            fs_1.default.unlink(imagePath, (err) => {
                if (err) {
                    console.error("Error al eliminar la imagen:", err);
                }
            });
            // Elimina el registro de la base de datos
            yield productoImagen.destroy();
            res
                .status(200)
                .json({ message: "Imagen de producto eliminada correctamente" });
        }
        else {
            res.status(404).json({ message: "Imagen de producto no encontrada" });
        }
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al eliminar la imagen de producto", error });
    }
});
exports.deleteProductoImagen = deleteProductoImagen;
//# sourceMappingURL=productoImagenes.js.map
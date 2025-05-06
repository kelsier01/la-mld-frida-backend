"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuración de almacenamiento
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path_1.default.join("./public/images")); // Guarda las imágenes en la carpeta "public/images"
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path_1.default.extname(file.originalname)); // Nombre único
    },
});
// Filtro para aceptar solo imágenes
const fileFilter = (req, // Tipo explícito para req
file, // Tipo explícito para file
cb // Tipo explícito para cb
) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]; // Tipos permitidos
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Aceptar el archivo
    }
};
// Configuración de Multer
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5 MB
});
exports.default = upload;
//# sourceMappingURL=multer.js.map
import multer from "multer";
import path from "path";
import { Request } from "express"; // Importa el tipo Request de Express

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../public/images")); // Guarda las imágenes en la carpeta "public/images"
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nombre único
  },
});

// Filtro para aceptar solo imágenes
const fileFilter = (
  req: Request, // Tipo explícito para req
  file: Express.Multer.File, // Tipo explícito para file
  cb: multer.FileFilterCallback // Tipo explícito para cb
) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"]; // Tipos permitidos
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Aceptar el archivo
  }
};

// Configuración de Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Límite de 5 MB
});

export default upload;
import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createProductoImagen,
  deleteProductoImagen,
  getAllProductoImagenes,
  getProductoImagenById,
  updateProductoImagen,
} from "../controllers/productoImagenes";

const route = Router();

route.get("/", [validarjwt], getAllProductoImagenes);
route.get("/:id", [validarjwt], getProductoImagenById);
route.post("/", createProductoImagen);
route.put("/:id", [validarjwt], updateProductoImagen);
route.delete("/:id", [validarjwt], deleteProductoImagen);

export default route;

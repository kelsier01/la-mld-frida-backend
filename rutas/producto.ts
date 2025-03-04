import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createProducto,
  deleteProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
} from "../controllers/productos";

const route = Router();

route.get("/", [validarjwt], getAllProductos);
route.get("/:id", [validarjwt], getProductoById);
route.post("/", [validarjwt], createProducto);
route.put("/:id", [validarjwt], updateProducto);
route.delete("/:id", [validarjwt], deleteProducto);

export default route;

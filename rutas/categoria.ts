import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createCategoria,
  deleteCategoria,
  getAllCategorias,
  getCategoriaById,
  updateCategoria,
} from "../controllers/categorias";

const route = Router();

route.get("/", [validarjwt], getAllCategorias);
route.get("/:id", [validarjwt], getCategoriaById);
route.post("/", [validarjwt], createCategoria);
route.put("/:id", [validarjwt], updateCategoria);
route.delete("/:id", [validarjwt], deleteCategoria);

export default route;

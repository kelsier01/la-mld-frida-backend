import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createMarca,
  deleteMarca,
  getAllMarcas,
  getMarcaById,
  updateMarca,
  getMarcas,
} from "../controllers/marcas";

const route = Router();

route.get("/", [validarjwt], getAllMarcas);
route.get("/all", [validarjwt], getMarcas);
route.get("/:id", [validarjwt], getMarcaById);
route.post("/", [validarjwt], createMarca);
route.put("/:id", [validarjwt], updateMarca);
route.delete("/:id", [validarjwt], deleteMarca);

export default route;

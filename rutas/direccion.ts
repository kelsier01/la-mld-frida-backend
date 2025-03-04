import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createDireccion,
  deleteDireccion,
  getAllDirecciones,
  getDireccionById,
  updateDireccion,
} from "../controllers/direcciones";

const route = Router();

route.get("/", [validarjwt], getAllDirecciones);
route.get("/:id", [validarjwt], getDireccionById);
route.post("/", [validarjwt], createDireccion);
route.put("/:id", [validarjwt], updateDireccion);
route.delete("/:id", [validarjwt], deleteDireccion);

export default route;

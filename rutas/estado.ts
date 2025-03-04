import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createEstado,
  deleteEstado,
  getAllEstados,
  getEstadoById,
  updateEstado,
} from "../controllers/estados";

const route = Router();

route.get("/", [validarjwt], getAllEstados);
route.get("/:id", [validarjwt], getEstadoById);
route.post("/", [validarjwt], createEstado);
route.put("/:id", [validarjwt], updateEstado);
route.delete("/:id", [validarjwt], deleteEstado);

export default route;

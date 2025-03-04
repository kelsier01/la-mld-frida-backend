import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createEmpleado,
  deleteEmpleado,
  getAllEmpleados,
  getEmpleadoById,
  updateEmpleado,
} from "../controllers/empleados";

const route = Router();

route.get("/", [validarjwt], getAllEmpleados);
route.get("/:id", [validarjwt], getEmpleadoById);
route.post("/", [validarjwt], createEmpleado);
route.put("/:id", [validarjwt], updateEmpleado);
route.delete("/:id", [validarjwt], deleteEmpleado);

export default route;

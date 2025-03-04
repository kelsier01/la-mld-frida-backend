import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createRol,
  deleteRol,
  getAllRoles,
  getRolById,
  updateRol,
} from "../controllers/roles";

const route = Router();

route.get("/", [validarjwt], getAllRoles);
route.get("/:id", [validarjwt], getRolById);
route.post("/", [validarjwt], createRol);
route.put("/:id", [validarjwt], updateRol);
route.delete("/:id", [validarjwt], deleteRol);

export default route;

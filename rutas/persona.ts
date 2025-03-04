import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createPersona,
  deletePersona,
  getAllPersonas,
  getPersonaById,
  updatePersona,
} from "../controllers/personas";

const route = Router();

route.get("/", [validarjwt], getAllPersonas);
// route.get("/rut/:rut",[validarjwt],g);
route.get("/:id", [validarjwt], getPersonaById);
route.post("/", [validarjwt], createPersona);
route.put("/:id", [validarjwt], updatePersona);
route.delete("/:id", [validarjwt], deletePersona);

export default route;

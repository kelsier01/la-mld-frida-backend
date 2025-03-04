import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createUsuario,
  deleteUsuario,
  getAllUsuarios,
  getUsarioByUid,
  getUsuarioById,
  updateUsuario,
} from "../controllers/usuarios";

const route = Router();

// route.get("/", [validarjwt], getUsers);
route.get("/", [validarjwt], getAllUsuarios);
route.get("/uid/:uid", [validarjwt], getUsarioByUid);
route.get("/:id", getUsuarioById);
route.post("/", [validarjwt], createUsuario);
route.put("/:id", [validarjwt], updateUsuario);
route.delete("/:id", [validarjwt], deleteUsuario);

export default route;

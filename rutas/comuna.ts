import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  getAllComunas,
  getComunaById,
  createComuna,
  updateComuna,
  deleteComuna,
} from "../controllers/comunas";

const route = Router();

route.get("/", [validarjwt], getAllComunas);
route.get("/:id", [validarjwt], getComunaById);
route.post("/", [validarjwt], createComuna);
route.put("/:id", [validarjwt], updateComuna);
route.delete("/:id", [validarjwt], deleteComuna);

export default route;

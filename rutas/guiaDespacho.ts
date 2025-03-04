import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createGuiaDespacho,
  deleteGuiaDespacho,
  getAllGuiasDespacho,
  getGuiaDespachoById,
  updateGuiaDespacho,
} from "../controllers/guiaDespachos";

const route = Router();

route.get("/", [validarjwt], getAllGuiasDespacho);
route.get("/:id", [validarjwt], getGuiaDespachoById);
route.post("/", [validarjwt], createGuiaDespacho);
route.put("/:id", [validarjwt], updateGuiaDespacho);
route.delete("/:id", [validarjwt], deleteGuiaDespacho);

export default route;

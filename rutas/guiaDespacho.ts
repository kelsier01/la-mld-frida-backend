import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createGuiaDespacho,
  deleteGuiaDespacho,
  getAllGuiasDespacho,
  getGuiaDespachoById,
  updateGuiaDespacho,
  generarCodigoGuiaDespacho,
} from "../controllers/guiaDespachos";

const route = Router();

route.get("/", [validarjwt], getAllGuiasDespacho);
route.get("/:id", [validarjwt], getGuiaDespachoById);
route.get("/generar/codigo", [validarjwt], generarCodigoGuiaDespacho);
route.post("/", [validarjwt], createGuiaDespacho);
route.put("/:id", [validarjwt], updateGuiaDespacho);
route.delete("/:id", [validarjwt], deleteGuiaDespacho);

export default route;

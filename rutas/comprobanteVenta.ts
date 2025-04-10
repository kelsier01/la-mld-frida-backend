import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createComprobanteVenta,
  deleteComprobanteVenta,
  getAllComprobantesVenta,
  getComprobanteVentaById,
  updateComprobanteVenta,
  generarCodigoComprobanteVenta
} from "../controllers/comprobantesVentas";

const route = Router();

route.get("/", [validarjwt], getAllComprobantesVenta);
route.get("/:id", [validarjwt], getComprobanteVentaById);
route.get("/generar/codigo", [validarjwt], generarCodigoComprobanteVenta);
route.post("/", [validarjwt], createComprobanteVenta);
route.put("/:id", [validarjwt], updateComprobanteVenta);
route.delete("/:id", [validarjwt], deleteComprobanteVenta);

export default route;

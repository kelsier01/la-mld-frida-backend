import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createPago,
  deletePago,
  getAllPagos,
  getPagoById,
  updatePago,
} from "../controllers/pagos";

const route = Router();

route.get("/", [validarjwt], getAllPagos);
route.get("/:id", [validarjwt], getPagoById);
route.post("/", [validarjwt], createPago);
route.put("/:id", [validarjwt], updatePago);
route.delete("/:id", [validarjwt], deletePago);

export default route;

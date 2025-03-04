import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createMetodoPago,
  deleteMetodoPago,
  getAllMetodosPago,
  getMetodoPagoById,
  updateMetodoPago,
} from "../controllers/metodosPagos";

const route = Router();

route.get("/", [validarjwt], getAllMetodosPago);
route.get("/:id", [validarjwt], getMetodoPagoById);
route.post("/", [validarjwt], createMetodoPago);
route.put("/:id", [validarjwt], updateMetodoPago);
route.delete("/:id", [validarjwt], deleteMetodoPago);

export default route;

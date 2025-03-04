import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createEstadoPedido,
  deleteEstadoPedido,
  getAllEstadoPedidos,
  getEstadoPedidoById,
  updateEstadoPedido,
} from "../controllers/estadoPedidos";

const route = Router();

route.get("/", [validarjwt], getAllEstadoPedidos);
route.get("/:id", [validarjwt], getEstadoPedidoById);
route.post("/", [validarjwt], createEstadoPedido);
route.put("/:id", [validarjwt], updateEstadoPedido);
route.delete("/:id", [validarjwt], deleteEstadoPedido);

export default route;

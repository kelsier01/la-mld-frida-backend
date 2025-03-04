import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createPedido,
  deletePedido,
  getAllPedidos,
  getPedidoById,
  updatePedido,
} from "../controllers/pedidos";

const route = Router();

route.get("/", [validarjwt], getAllPedidos);
route.get("/:id", [validarjwt], getPedidoById);
route.post("/", [validarjwt], createPedido);
route.put("/:id", [validarjwt], updatePedido);
route.delete("/:id", [validarjwt], deletePedido);

export default route;

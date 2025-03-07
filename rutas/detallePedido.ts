import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createDetallePedido,
  deleteDetallePedido,
  getAllDetallePedidos,
  getDetallePedidoById,
  updateDetallePedido,
  getDetallePedidoByPedidoId
} from "../controllers/detallePedidos";

const route = Router();

route.get("/", [validarjwt], getAllDetallePedidos);
route.get("/pedido/:pedidoId", [validarjwt], getDetallePedidoByPedidoId);
route.get("/:id", [validarjwt], getDetallePedidoById);
route.post("/", [validarjwt], createDetallePedido);
route.put("/:id", [validarjwt], updateDetallePedido);
route.delete("/:id", [validarjwt], deleteDetallePedido);

export default route;

import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createDetallePedido,
  deleteDetallePedido,
  getAllDetallePedidos,
  getDetallePedidoById,
  updateDetallePedido,
} from "../controllers/detallePedidos";

const route = Router();

route.get("/", [validarjwt], getAllDetallePedidos);
route.get("/:id", [validarjwt], getDetallePedidoById);
route.post("/", [validarjwt], createDetallePedido);
route.put("/:id", [validarjwt], updateDetallePedido);
route.delete("/:id", [validarjwt], deleteDetallePedido);

export default route;

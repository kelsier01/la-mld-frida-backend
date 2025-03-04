import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createLogEstadoPedido,
  deleteLogEstadoPedido,
  getAllLogEstadoPedidos,
  getLogEstadoPedidoById,
  updateLogEstadoPedido,
} from "../controllers/logEstadosPedidos";

const route = Router();

route.get("/", [validarjwt], getAllLogEstadoPedidos);
route.get("/:id", [validarjwt], getLogEstadoPedidoById);
route.post("/", [validarjwt], createLogEstadoPedido);
route.put("/:id", [validarjwt], updateLogEstadoPedido);
route.delete("/:id", [validarjwt], deleteLogEstadoPedido);

export default route;

import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";

import {
  createCliente,
  deleteCliente,
  getAllClientes,
  getClienteById,
  updateCliente,
} from "../controllers/clientes";

const route = Router();

route.get("/", [validarjwt], getAllClientes);
route.get("/:id", [validarjwt], getClienteById);
route.post("/", [validarjwt], createCliente);
route.put("/:id", [validarjwt], updateCliente);
route.put("/eliminar/:id", [validarjwt], deleteCliente);

export default route;

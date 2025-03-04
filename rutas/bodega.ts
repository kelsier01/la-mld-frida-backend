import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createBodega,
  deleteBodega,
  getAllBodegas,
  getBodegaById,
  updateBodega,
} from "../controllers/bodegas";

const route = Router();

route.get("/", [validarjwt], getAllBodegas);
route.get("/:id", [validarjwt], getBodegaById);
route.post("/", [validarjwt], createBodega);
route.put("/:id", [validarjwt], updateBodega);
route.delete("/:id", [validarjwt], deleteBodega);

export default route;

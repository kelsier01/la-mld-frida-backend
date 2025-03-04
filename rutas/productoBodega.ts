import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createProductoBodega,
  deleteProductoBodega,
  getAllProductoBodegas,
  getProductoBodegaById,
  updateProductoBodega,
} from "../controllers/productoBodegas";

const route = Router();

route.get("/", [validarjwt], getAllProductoBodegas);
route.get("/:id", [validarjwt], getProductoBodegaById);
route.post("/", [validarjwt], createProductoBodega);
route.put("/:id", [validarjwt], updateProductoBodega);
route.delete("/:id", [validarjwt], deleteProductoBodega);

export default route;

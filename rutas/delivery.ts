import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createDelivery,
  deleteDelivery,
  getAllDeliverys,
  getDeliveryById,
  updateDelivery,
} from "../controllers/deliverys";

const route = Router();

route.get("/", [validarjwt], getAllDeliverys);
route.get("/:id", [validarjwt], getDeliveryById);
route.post("/", [validarjwt], createDelivery);
route.put("/:id", [validarjwt], updateDelivery);
route.delete("/:id", [validarjwt], deleteDelivery);

export default route;

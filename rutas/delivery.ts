import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createDelivery,
  deleteDelivery,
  getAllDeliverys,
  getDeliveryById,
  getDeliverys,
  updateDelivery,
} from "../controllers/deliverys";

const route = Router();

route.get("/", [validarjwt], getAllDeliverys);
route.get("/allDeliverys", [validarjwt], getDeliverys);
route.get("/:id", [validarjwt], getDeliveryById);
route.post("/", [validarjwt], createDelivery);
route.put("/:id", [validarjwt], updateDelivery);
route.delete("/:id", [validarjwt], deleteDelivery);

export default route;

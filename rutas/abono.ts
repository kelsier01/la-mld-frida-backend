import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createAbono,
  deleteAbono,
  getAllAbonos,
  getAbonoById,
  updateAbono,
} from "../controllers/abonos";

const route = Router();

route.get("/", [validarjwt], getAllAbonos);
route.get("/:id", [validarjwt], getAbonoById);
route.post("/", [validarjwt], createAbono);
route.put("/:id", [validarjwt], updateAbono);
route.delete("/:id", [validarjwt], deleteAbono);

export default route;

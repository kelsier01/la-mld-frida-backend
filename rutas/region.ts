import { Router } from "express";
import { validarjwt } from "../middlewares/validarToken";
import {
  createRegion,
  deleteRegion,
  getAllRegiones,
  getRegionById,
  updateRegion,
} from "../controllers/regiones";

const route = Router();

route.get("/", [validarjwt], getAllRegiones);
route.get("/:id", [validarjwt], getRegionById);
route.post("/", [validarjwt], createRegion);
route.put("/:id", [validarjwt], updateRegion);
route.delete("/:id", [validarjwt], deleteRegion);

export default route;
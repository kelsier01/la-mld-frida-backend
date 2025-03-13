"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const regiones_1 = require("../controllers/regiones");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], regiones_1.getAllRegiones);
route.get("/:id", [validarToken_1.validarjwt], regiones_1.getRegionById);
route.post("/", [validarToken_1.validarjwt], regiones_1.createRegion);
route.put("/:id", [validarToken_1.validarjwt], regiones_1.updateRegion);
route.delete("/:id", [validarToken_1.validarjwt], regiones_1.deleteRegion);
exports.default = route;
//# sourceMappingURL=region.js.map
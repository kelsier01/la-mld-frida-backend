"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const direcciones_1 = require("../controllers/direcciones");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], direcciones_1.getAllDirecciones);
route.get("/:id", [validarToken_1.validarjwt], direcciones_1.getDireccionById);
route.post("/", [validarToken_1.validarjwt], direcciones_1.createDireccion);
route.put("/:id", [validarToken_1.validarjwt], direcciones_1.updateDireccion);
route.delete("/:id", [validarToken_1.validarjwt], direcciones_1.deleteDireccion);
exports.default = route;
//# sourceMappingURL=direccion.js.map
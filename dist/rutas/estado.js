"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const estados_1 = require("../controllers/estados");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], estados_1.getAllEstados);
route.get("/:id", [validarToken_1.validarjwt], estados_1.getEstadoById);
route.post("/", [validarToken_1.validarjwt], estados_1.createEstado);
route.put("/:id", [validarToken_1.validarjwt], estados_1.updateEstado);
route.delete("/:id", [validarToken_1.validarjwt], estados_1.deleteEstado);
exports.default = route;
//# sourceMappingURL=estado.js.map
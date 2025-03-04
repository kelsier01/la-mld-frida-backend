"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const metodosPagos_1 = require("../controllers/metodosPagos");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], metodosPagos_1.getAllMetodosPago);
route.get("/:id", [validarToken_1.validarjwt], metodosPagos_1.getMetodoPagoById);
route.post("/", [validarToken_1.validarjwt], metodosPagos_1.createMetodoPago);
route.put("/:id", [validarToken_1.validarjwt], metodosPagos_1.updateMetodoPago);
route.delete("/:id", [validarToken_1.validarjwt], metodosPagos_1.deleteMetodoPago);
exports.default = route;
//# sourceMappingURL=metodoPago.js.map
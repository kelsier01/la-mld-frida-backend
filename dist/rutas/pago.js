"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const pagos_1 = require("../controllers/pagos");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], pagos_1.getAllPagos);
route.get("/:id", [validarToken_1.validarjwt], pagos_1.getPagoById);
route.post("/", [validarToken_1.validarjwt], pagos_1.createPago);
route.put("/:id", [validarToken_1.validarjwt], pagos_1.updatePago);
route.delete("/:id", [validarToken_1.validarjwt], pagos_1.deletePago);
exports.default = route;
//# sourceMappingURL=pago.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const comprobantesVentas_1 = require("../controllers/comprobantesVentas");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], comprobantesVentas_1.getAllComprobantesVenta);
route.get("/:id", [validarToken_1.validarjwt], comprobantesVentas_1.getComprobanteVentaById);
route.post("/", [validarToken_1.validarjwt], comprobantesVentas_1.createComprobanteVenta);
route.put("/:id", [validarToken_1.validarjwt], comprobantesVentas_1.updateComprobanteVenta);
route.delete("/:id", [validarToken_1.validarjwt], comprobantesVentas_1.deleteComprobanteVenta);
exports.default = route;
//# sourceMappingURL=comprobanteVenta.js.map
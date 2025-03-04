"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const detallePedidos_1 = require("../controllers/detallePedidos");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], detallePedidos_1.getAllDetallePedidos);
route.get("/:id", [validarToken_1.validarjwt], detallePedidos_1.getDetallePedidoById);
route.post("/", [validarToken_1.validarjwt], detallePedidos_1.createDetallePedido);
route.put("/:id", [validarToken_1.validarjwt], detallePedidos_1.updateDetallePedido);
route.delete("/:id", [validarToken_1.validarjwt], detallePedidos_1.deleteDetallePedido);
exports.default = route;
//# sourceMappingURL=detallePedido.js.map
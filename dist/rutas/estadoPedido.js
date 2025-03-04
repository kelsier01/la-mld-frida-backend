"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const estadoPedidos_1 = require("../controllers/estadoPedidos");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], estadoPedidos_1.getAllEstadoPedidos);
route.get("/:id", [validarToken_1.validarjwt], estadoPedidos_1.getEstadoPedidoById);
route.post("/", [validarToken_1.validarjwt], estadoPedidos_1.createEstadoPedido);
route.put("/:id", [validarToken_1.validarjwt], estadoPedidos_1.updateEstadoPedido);
route.delete("/:id", [validarToken_1.validarjwt], estadoPedidos_1.deleteEstadoPedido);
exports.default = route;
//# sourceMappingURL=estadoPedido.js.map
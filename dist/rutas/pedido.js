"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const pedidos_1 = require("../controllers/pedidos");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], pedidos_1.getAllPedidos);
route.get("/:id", [validarToken_1.validarjwt], pedidos_1.getPedidoById);
route.post("/", [validarToken_1.validarjwt], pedidos_1.createPedido);
route.put("/:id", [validarToken_1.validarjwt], pedidos_1.updatePedido);
route.delete("/:id", [validarToken_1.validarjwt], pedidos_1.deletePedido);
exports.default = route;
//# sourceMappingURL=pedido.js.map
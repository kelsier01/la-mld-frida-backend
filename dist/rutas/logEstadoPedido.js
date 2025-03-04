"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const logEstadosPedidos_1 = require("../controllers/logEstadosPedidos");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], logEstadosPedidos_1.getAllLogEstadoPedidos);
route.get("/:id", [validarToken_1.validarjwt], logEstadosPedidos_1.getLogEstadoPedidoById);
route.post("/", [validarToken_1.validarjwt], logEstadosPedidos_1.createLogEstadoPedido);
route.put("/:id", [validarToken_1.validarjwt], logEstadosPedidos_1.updateLogEstadoPedido);
route.delete("/:id", [validarToken_1.validarjwt], logEstadosPedidos_1.deleteLogEstadoPedido);
exports.default = route;
//# sourceMappingURL=logEstadoPedido.js.map
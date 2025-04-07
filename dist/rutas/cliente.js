"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const clientes_1 = require("../controllers/clientes");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], clientes_1.getAllClientes);
route.get("/:id", [validarToken_1.validarjwt], clientes_1.getClienteById);
route.post("/", [validarToken_1.validarjwt], clientes_1.createCliente);
route.put("/:id", [validarToken_1.validarjwt], clientes_1.updateCliente);
route.put("/eliminar/:id", [validarToken_1.validarjwt], clientes_1.deleteCliente);
exports.default = route;
//# sourceMappingURL=cliente.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const roles_1 = require("../controllers/roles");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], roles_1.getAllRoles);
route.get("/:id", [validarToken_1.validarjwt], roles_1.getRolById);
route.post("/", [validarToken_1.validarjwt], roles_1.createRol);
route.put("/:id", [validarToken_1.validarjwt], roles_1.updateRol);
route.delete("/:id", [validarToken_1.validarjwt], roles_1.deleteRol);
exports.default = route;
//# sourceMappingURL=rol.js.map
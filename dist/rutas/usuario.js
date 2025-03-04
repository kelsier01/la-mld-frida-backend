"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const usuarios_1 = require("../controllers/usuarios");
const route = (0, express_1.Router)();
// route.get("/", [validarjwt], getUsers);
route.get("/", [validarToken_1.validarjwt], usuarios_1.getAllUsuarios);
route.get("/uid/:uid", [validarToken_1.validarjwt], usuarios_1.getUsarioByUid);
route.get("/:id", usuarios_1.getUsuarioById);
route.post("/", [validarToken_1.validarjwt], usuarios_1.createUsuario);
route.put("/:id", [validarToken_1.validarjwt], usuarios_1.updateUsuario);
route.delete("/:id", [validarToken_1.validarjwt], usuarios_1.deleteUsuario);
exports.default = route;
//# sourceMappingURL=usuario.js.map
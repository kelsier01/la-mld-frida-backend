"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const comunas_1 = require("../controllers/comunas");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], comunas_1.getAllComunas);
route.get("/:id", [validarToken_1.validarjwt], comunas_1.getComunaById);
route.post("/", [validarToken_1.validarjwt], comunas_1.createComuna);
route.put("/:id", [validarToken_1.validarjwt], comunas_1.updateComuna);
route.delete("/:id", [validarToken_1.validarjwt], comunas_1.deleteComuna);
exports.default = route;
//# sourceMappingURL=comuna.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const guiaDespachos_1 = require("../controllers/guiaDespachos");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], guiaDespachos_1.getAllGuiasDespacho);
route.get("/:id", [validarToken_1.validarjwt], guiaDespachos_1.getGuiaDespachoById);
route.post("/", [validarToken_1.validarjwt], guiaDespachos_1.createGuiaDespacho);
route.put("/:id", [validarToken_1.validarjwt], guiaDespachos_1.updateGuiaDespacho);
route.delete("/:id", [validarToken_1.validarjwt], guiaDespachos_1.deleteGuiaDespacho);
exports.default = route;
//# sourceMappingURL=guiaDespacho.js.map
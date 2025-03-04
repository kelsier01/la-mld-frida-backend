"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const bodegas_1 = require("../controllers/bodegas");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], bodegas_1.getAllBodegas);
route.get("/:id", [validarToken_1.validarjwt], bodegas_1.getBodegaById);
route.post("/", [validarToken_1.validarjwt], bodegas_1.createBodega);
route.put("/:id", [validarToken_1.validarjwt], bodegas_1.updateBodega);
route.delete("/:id", [validarToken_1.validarjwt], bodegas_1.deleteBodega);
exports.default = route;
//# sourceMappingURL=bodega.js.map
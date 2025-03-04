"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const marcas_1 = require("../controllers/marcas");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], marcas_1.getAllMarcas);
route.get("/:id", [validarToken_1.validarjwt], marcas_1.getMarcaById);
route.post("/", [validarToken_1.validarjwt], marcas_1.createMarca);
route.put("/:id", [validarToken_1.validarjwt], marcas_1.updateMarca);
route.delete("/:id", [validarToken_1.validarjwt], marcas_1.deleteMarca);
exports.default = route;
//# sourceMappingURL=marca.js.map
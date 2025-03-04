"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const categorias_1 = require("../controllers/categorias");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], categorias_1.getAllCategorias);
route.get("/:id", [validarToken_1.validarjwt], categorias_1.getCategoriaById);
route.post("/", [validarToken_1.validarjwt], categorias_1.createCategoria);
route.put("/:id", [validarToken_1.validarjwt], categorias_1.updateCategoria);
route.delete("/:id", [validarToken_1.validarjwt], categorias_1.deleteCategoria);
exports.default = route;
//# sourceMappingURL=categoria.js.map
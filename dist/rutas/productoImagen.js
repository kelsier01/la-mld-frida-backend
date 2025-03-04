"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const productoImagenes_1 = require("../controllers/productoImagenes");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], productoImagenes_1.getAllProductoImagenes);
route.get("/:id", [validarToken_1.validarjwt], productoImagenes_1.getProductoImagenById);
route.post("/", productoImagenes_1.createProductoImagen);
route.put("/:id", [validarToken_1.validarjwt], productoImagenes_1.updateProductoImagen);
route.delete("/:id", [validarToken_1.validarjwt], productoImagenes_1.deleteProductoImagen);
exports.default = route;
//# sourceMappingURL=productoImagen.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const productos_1 = require("../controllers/productos");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], productos_1.getAllProductos);
route.get("/:id", [validarToken_1.validarjwt], productos_1.getProductoById);
route.post("/", [validarToken_1.validarjwt], productos_1.createProducto);
route.put("/:id", [validarToken_1.validarjwt], productos_1.updateProducto);
route.delete("/:id", [validarToken_1.validarjwt], productos_1.deleteProducto);
exports.default = route;
//# sourceMappingURL=producto.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const productoBodegas_1 = require("../controllers/productoBodegas");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], productoBodegas_1.getAllProductoBodegas);
route.get("/:id", [validarToken_1.validarjwt], productoBodegas_1.getProductoBodegaById);
route.post("/", [validarToken_1.validarjwt], productoBodegas_1.createProductoBodega);
route.put("/:id", [validarToken_1.validarjwt], productoBodegas_1.updateProductoBodega);
route.delete("/:id", [validarToken_1.validarjwt], productoBodegas_1.deleteProductoBodega);
exports.default = route;
//# sourceMappingURL=productoBodega.js.map
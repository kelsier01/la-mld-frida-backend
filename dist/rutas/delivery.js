"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const deliverys_1 = require("../controllers/deliverys");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], deliverys_1.getAllDeliverys);
route.get("/:id", [validarToken_1.validarjwt], deliverys_1.getDeliveryById);
route.post("/", [validarToken_1.validarjwt], deliverys_1.createDelivery);
route.put("/:id", [validarToken_1.validarjwt], deliverys_1.updateDelivery);
route.delete("/:id", [validarToken_1.validarjwt], deliverys_1.deleteDelivery);
exports.default = route;
//# sourceMappingURL=delivery.js.map
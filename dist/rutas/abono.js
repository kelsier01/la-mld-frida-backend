"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const abonos_1 = require("../controllers/abonos");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], abonos_1.getAllAbonos);
route.get("/:id", [validarToken_1.validarjwt], abonos_1.getAbonoById);
route.post("/", [validarToken_1.validarjwt], abonos_1.createAbono);
route.put("/:id", [validarToken_1.validarjwt], abonos_1.updateAbono);
route.delete("/:id", [validarToken_1.validarjwt], abonos_1.deleteAbono);
exports.default = route;
//# sourceMappingURL=abono.js.map
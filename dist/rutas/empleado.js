"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const empleados_1 = require("../controllers/empleados");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], empleados_1.getAllEmpleados);
route.get("/:id", [validarToken_1.validarjwt], empleados_1.getEmpleadoById);
route.post("/", [validarToken_1.validarjwt], empleados_1.createEmpleado);
route.put("/:id", [validarToken_1.validarjwt], empleados_1.updateEmpleado);
route.delete("/:id", [validarToken_1.validarjwt], empleados_1.deleteEmpleado);
exports.default = route;
//# sourceMappingURL=empleado.js.map
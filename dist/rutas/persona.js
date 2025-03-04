"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validarToken_1 = require("../middlewares/validarToken");
const personas_1 = require("../controllers/personas");
const route = (0, express_1.Router)();
route.get("/", [validarToken_1.validarjwt], personas_1.getAllPersonas);
// route.get("/rut/:rut",[validarjwt],g);
route.get("/:id", [validarToken_1.validarjwt], personas_1.getPersonaById);
route.post("/", [validarToken_1.validarjwt], personas_1.createPersona);
route.put("/:id", [validarToken_1.validarjwt], personas_1.updatePersona);
route.delete("/:id", [validarToken_1.validarjwt], personas_1.deletePersona);
exports.default = route;
//# sourceMappingURL=persona.js.map
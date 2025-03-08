"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
const Persona = connection_1.default.define("persona", {
    nombre: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    correo: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
    n_identificacion: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    fono: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
});
exports.default = Persona;
//# sourceMappingURL=Persona.js.map
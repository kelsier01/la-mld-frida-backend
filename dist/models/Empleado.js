"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
const Empleado = connection_1.default.define("empleado", {
    personas_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    usuarios_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    eliminado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
});
exports.default = Empleado;
//# sourceMappingURL=Empleado.js.map
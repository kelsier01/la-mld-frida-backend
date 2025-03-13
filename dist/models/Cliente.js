"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
const Clientes = connection_1.default.define("clientes", {
    personas_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cta_instagram: {
        type: sequelize_1.DataTypes.STRING(145),
        allowNull: true,
    },
    eliminado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
exports.default = Clientes;
//# sourceMappingURL=Cliente.js.map
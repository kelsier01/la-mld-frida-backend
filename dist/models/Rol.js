"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
const rol = connection_1.default.define("role", {
    rol: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
});
exports.default = rol;
//# sourceMappingURL=Rol.js.map
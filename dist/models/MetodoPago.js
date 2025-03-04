"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
class MetodoPago extends sequelize_1.Model {
}
MetodoPago.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: "metodos_pagos",
    timestamps: true,
});
exports.default = MetodoPago;
//# sourceMappingURL=MetodoPago.js.map
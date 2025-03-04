"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
class Direccion extends sequelize_1.Model {
}
Direccion.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    clientes_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    direccion: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    region: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    comuna: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: "direcciones",
    timestamps: true,
});
exports.default = Direccion;
//# sourceMappingURL=Direccion.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
class GuiaDespacho extends sequelize_1.Model {
}
GuiaDespacho.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
    estados_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: "guias_despachos",
    timestamps: true,
});
exports.default = GuiaDespacho;
//# sourceMappingURL=GuiaDespacho.js.map
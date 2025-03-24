"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
class EstadoPedido extends sequelize_1.Model {
}
EstadoPedido.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    estado_pedido: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: "estado_pedidos",
    timestamps: true,
});
exports.default = EstadoPedido;
//# sourceMappingURL=EstadoPedido.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
class LogEstadoPedido extends sequelize_1.Model {
}
LogEstadoPedido.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pedidos_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estado_pedidos_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    empleados_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: "log_estado_pedidos",
    timestamps: true,
});
exports.default = LogEstadoPedido;
//# sourceMappingURL=LogEstadoPedido.js.map
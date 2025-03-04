"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
class Pedido extends sequelize_1.Model {
}
Pedido.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    empleados_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    clientes_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    estado_pedidos_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    deliverys_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    monto_total: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    documento_usa_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    n_despacho_chile: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
    comprobante_ventas_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: "pedidos",
    timestamps: true,
});
exports.default = Pedido;
//# sourceMappingURL=Pedido.js.map
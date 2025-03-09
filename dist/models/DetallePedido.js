"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
class DetallePedido extends sequelize_1.Model {
}
DetallePedido.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pedidos_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    productos_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    cantidad: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    precio_venta: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    precio_compra_clp: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    precio_compra_usd: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    precio_compra_guia: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    adicional: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
    bodegas_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: "detalle_pedidos",
    timestamps: true,
});
exports.default = DetallePedido;
//# sourceMappingURL=DetallePedido.js.map
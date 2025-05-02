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
        allowNull: true,
    },
    monto_total: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    guia_despacho_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    tracking_number: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: true,
    },
    comprobante_ventas_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    direccion_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    bodega_destino_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    fecha_entrega: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    eliminado: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    }
}, {
    sequelize: connection_1.default,
    tableName: "pedidos",
    timestamps: true,
});
exports.default = Pedido;
//# sourceMappingURL=Pedido.js.map
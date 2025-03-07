"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
const Empleado_1 = __importDefault(require("./Empleado"));
const Cliente_1 = __importDefault(require("./Cliente"));
const EstadoPedido_1 = __importDefault(require("./EstadoPedido"));
const Delivery_1 = __importDefault(require("./Delivery"));
const GuiaDespacho_1 = __importDefault(require("./GuiaDespacho"));
const ComprobanteVenta_1 = __importDefault(require("./ComprobanteVenta"));
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
// Relaciones con nombres
Pedido.belongsTo(Empleado_1.default, { foreignKey: 'empleados_id', as: 'empleado' });
Empleado_1.default.hasMany(Pedido, { foreignKey: 'empleados_id', as: 'pedidos' });
Pedido.belongsTo(Cliente_1.default, { foreignKey: 'clientes_id', as: 'cliente' });
Cliente_1.default.hasMany(Pedido, { foreignKey: 'clientes_id', as: 'pedidos' });
Pedido.belongsTo(EstadoPedido_1.default, { foreignKey: 'estado_pedidos_id', as: 'estadoPedido' });
EstadoPedido_1.default.hasMany(Pedido, { foreignKey: 'estado_pedidos_id', as: 'pedidos' });
Pedido.belongsTo(Delivery_1.default, { foreignKey: 'deliverys_id', as: 'delivery' });
Delivery_1.default.hasMany(Pedido, { foreignKey: 'deliverys_id', as: 'pedidos' });
Pedido.belongsTo(GuiaDespacho_1.default, { foreignKey: 'documento_usa_id', as: 'documentoUsa' });
GuiaDespacho_1.default.hasMany(Pedido, { foreignKey: 'documento_usa_id', as: 'pedidos' });
Pedido.belongsTo(ComprobanteVenta_1.default, { foreignKey: 'comprobante_ventas_id', as: 'comprobanteVenta' });
ComprobanteVenta_1.default.hasMany(Pedido, { foreignKey: 'comprobante_ventas_id', as: 'pedidos' });
exports.default = Pedido;
//# sourceMappingURL=Pedido.js.map
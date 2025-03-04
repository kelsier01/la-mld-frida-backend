"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
class Pago extends sequelize_1.Model {
}
Pago.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pedidos_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    monto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    fecha_pago: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    pago_parcializado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    metodos_pago_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: "pagos",
    timestamps: true,
});
exports.default = Pago;
//# sourceMappingURL=Pago.js.map
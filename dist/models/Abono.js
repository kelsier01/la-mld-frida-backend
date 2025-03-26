"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
class Abono extends sequelize_1.Model {
}
Abono.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    pagos_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    monto: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    metodos_pago_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    empleados_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: "abonos",
    timestamps: true,
});
exports.default = Abono;
//# sourceMappingURL=Abono.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
const Empleado = connection_1.default.define("empleados", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    personas_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'personas', // Nombre de la tabla en la base de datos
            key: 'id'
        }
    },
    usuarios_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    eliminado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: "empleados", // Especificar explícitamente el nombre de la tabla
    timestamps: true
});
exports.default = Empleado;
//# sourceMappingURL=Empleado.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
class Producto extends sequelize_1.Model {
}
Producto.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Categoria_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    marcas_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    codigo: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    precio_venta: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    Precio_compra_usd: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize: connection_1.default,
    tableName: "productos",
    timestamps: true,
});
exports.default = Producto;
//# sourceMappingURL=Producto.js.map
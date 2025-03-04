"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
class ProductoImagen extends sequelize_1.Model {
}
ProductoImagen.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productos_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    url: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: "producto_imagenes",
    timestamps: true,
});
exports.default = ProductoImagen;
//# sourceMappingURL=ProductoImagen.js.map
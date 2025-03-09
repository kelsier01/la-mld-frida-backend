"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
class ProductoBodega extends sequelize_1.Model {
}
ProductoBodega.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productos_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    bodegas_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    stock: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    sequelize: connection_1.default,
    tableName: "producto_bodegas",
    timestamps: true,
});
exports.default = ProductoBodega;
//# sourceMappingURL=ProductoBodega.js.map
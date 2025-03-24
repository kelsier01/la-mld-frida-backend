"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../BD/connection"));
const Users = connection_1.default.define("usuario", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    uid: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
    },
    isActive: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: true,
    },
    roles_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
});
// Sobrescribir el método toJSON para excluir el campo password
Users.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    // Excluir el campo password
    delete values.password;
    return values;
};
exports.default = Users;
//# sourceMappingURL=Usuario.js.map
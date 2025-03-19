"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const BD_HOST = process.env.BD_HOST || "localhost";
const BD_NAME = process.env.BD_NAME || "agendafr_lmd_frida";
const BD_USERNAME = process.env.BD_USERNAME || "root";
const BD_PASSWORD = process.env.BD_PASSWORD || "";
const BD_PORT = Number(process.env.BD_PORT) || 3306;
//BASE DE DATOS LOCAL
const db = new sequelize_1.Sequelize(BD_NAME, BD_USERNAME, BD_PASSWORD, {
    host: BD_HOST,
    dialect: "mysql",
    port: BD_PORT,
});
// BASE DE DATOS EN SERVIDOR
// const db = new Sequelize(
//  "agendafr_lmd_frida",
//   "agendafr_lmd_frida",
//  "8vrUEcUfhu2Gbn96YtGj",
//  {
//   host: "agendafree.cl",
//   dialect: "mysql",
// });
// console.log("HOST CONECTADO A: agendafree.cl");
exports.default = db;
//# sourceMappingURL=connection.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize("agendafr_lmd_frida", "agendafr_lmd_frida", "8vrUEcUfhu2Gbn96YtGj", {
    host: "agendafree.cl",
    // const db = new Sequelize("bd_lmtdfrida", "root", "", {
    //   host: "localhost",
    dialect: "mysql",
});
console.log("HOST CONECTADO A: agendafree.cl");
// const db = new Sequelize(process.env.DB_NAME, process.env.USERNAME_DB, process.env.PASSWORD_DB, {
// host: process.env.HOST_DB,
// dialect: "mysql",
// port: process.env.PORT_DB,
// define: {
//   createdAt: false,
//   updatedAt: false,
// },
// });
exports.default = db;
//# sourceMappingURL=connection.js.map
import { Sequelize } from "sequelize";

const BD_HOST: string = process.env.BD_HOST || "localhost";
const BD_NAME: string = process.env.BD_NAME || "agendafr_lmd_frida";
const BD_USERNAME: string = process.env.BD_USERNAME || "root";
const BD_PASSWORD: string = process.env.BD_PASSWORD || "";
const BD_PORT: number = Number(process.env.BD_PORT) || 3306;

//BASE DE DATOS LOCAL
const db = new Sequelize(BD_NAME, BD_USERNAME, BD_PASSWORD, {
  host: BD_HOST,
  dialect: "mysql",
  port: BD_PORT,
  define: {
    // Solo habilitar timestamps globalmente
    timestamps: true, // Activar los campos createdAt y updatedAt por defecto
  },
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

export default db;

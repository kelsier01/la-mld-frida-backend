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

// Sincronizar la base de datos sin modificar estructura
db.sync({ alter: false, force: false })
  .then(() => {
    console.log("Conexión a la base de datos establecida correctamente.");
  })
  .catch((error) => {
    console.error("Error al conectar la base de datos:", error);
  });

export default db;

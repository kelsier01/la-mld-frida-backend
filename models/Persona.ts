import { DataTypes } from "sequelize";
import db from "../BD/connection";

const Persona = db.define("personas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
  n_identificacion: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  fono: {
    type: DataTypes.STRING(45),
    allowNull: true,
  },
});
export default Persona;

import { DataTypes } from "sequelize";
import db from "../BD/connection";

const Clientes = db.define("clientes", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  personas_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cta_instagram: {
    type: DataTypes.STRING(145),
    allowNull: true,
  },
  eliminado: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Clientes;

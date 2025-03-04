import { DataTypes } from "sequelize";
import db from "../BD/connection";

const Clientes = db.define("cliente", {
  personas_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cta_instagram: {
    type: DataTypes.STRING(145),
    allowNull: true,
  },
  eliminado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Clientes;
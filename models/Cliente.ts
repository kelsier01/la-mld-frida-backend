import { DataTypes } from "sequelize";
import db from "../BD/connection";
import Persona from "./Persona";

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

Clientes.belongsTo(Persona, { foreignKey: "personas_id", as: "persona" });

export default Clientes;
import { DataTypes } from "sequelize";
import db from "../BD/connection";

const Estados = db.define("estados", {
  estado_pedido: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

export default Estados;

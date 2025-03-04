import { DataTypes } from "sequelize";
import db from "../BD/connection";

const rol = db.define("role", {
  rol: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});
export default rol;

import { DataTypes } from "sequelize";
import db from "../BD/connection";

const Empleado = db.define("empleado", {
  personas_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuarios_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eliminado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default Empleado;

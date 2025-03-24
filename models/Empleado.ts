import { DataTypes } from "sequelize";
import db from "../BD/connection";
import Persona from "./Persona";

const Empleado = db.define("empleados", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  personas_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'personas',  // Nombre de la tabla en la base de datos
      key: 'id'
    }
  },
  usuarios_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eliminado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  tableName: "empleados",  // Especificar explícitamente el nombre de la tabla
  timestamps: true
});

export default Empleado;

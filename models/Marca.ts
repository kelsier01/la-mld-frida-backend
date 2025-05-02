import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class Marca extends Model {
  public id!: number;
  public nombre!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Marca.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "marcas",
    timestamps: true,
  }
);

export default Marca;

import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class Categoria extends Model {
  public id!: number;
  public nombre!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Categoria.init(
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
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "categorias",
    timestamps: true,
  }
);

export default Categoria;

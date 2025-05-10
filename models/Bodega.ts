import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class Bodega extends Model {
  public id!: number;
  public nombre!: string;
  public ubicacion!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Bodega.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    ubicacion: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "bodegas",
    timestamps: true, // Asegura que se usen createdAt y updatedAt
  }
);

export default Bodega;

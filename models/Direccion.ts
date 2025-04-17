import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class Direccion extends Model {
  public id!: number;
  public clientes_id!: number;
  public direccion!: string;
  public region_id!: number;
  public comuna_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Direccion.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(145),
      allowNull: false,
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    comuna_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "direcciones",
    timestamps: true,
  }
);

export default Direccion;

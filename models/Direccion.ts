import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class Direccion extends Model {
  public id!: number;
  public clientes_id!: number;
  public direccion!: string;
  public region!: string;
  public comuna!: string;

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
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    comuna: {
      type: DataTypes.STRING(45),
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

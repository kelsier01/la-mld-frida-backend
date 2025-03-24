import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class Estado extends Model {
  public id!: number;
  public estado!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Estado.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estado: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "estados",
    timestamps: true,
  }
);


export default Estado;

import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class Delivery extends Model {
  public id!: number;
  public empresa!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Delivery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    empresa: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "deliverys",
    timestamps: true,
  }
);

export default Delivery;

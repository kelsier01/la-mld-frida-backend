import { DataTypes, Model, Sequelize } from "sequelize";
import db from "../BD/connection";

class Comuna extends Model {
  public id!: number;
  public nombre!: string;
  public region_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Comuna.init(
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
    region_id: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    },
  },
  {
    sequelize: db,
    tableName: "comunas",
    timestamps: true,
  }
);

export default Comuna;

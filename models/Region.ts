import { DataTypes, Model, Sequelize } from "sequelize";
import db from "../BD/connection";

class Region extends Model {
  public id!: number;
  public nombre!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Region.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
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
    tableName: "regiones",
    timestamps: true,
  }
);

export default Region;

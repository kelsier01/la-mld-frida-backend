import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class GuiaDespacho extends Model {
  public id!: number;
  public codigo!: string;
  public estados_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GuiaDespacho.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    estados_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subtotal:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    insurage:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    other:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "guias_despachos",
    timestamps: true,
  }
);

export default GuiaDespacho;

import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class GuiaDespacho extends Model {
  public id!: number;
  public codigo!: string;
  public estados_id!: number;
  public bodega_id!: number;
  public subtotal!: number;
  public insurage!: number;
  public other!: number;
  public total!: number;

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
    bodega_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    subtotal:{
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    insurage:{
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    other:{
      type: DataTypes.DECIMAL(10,2),
      allowNull: false,
    },
    total:{
      type: DataTypes.DECIMAL(10,2),
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

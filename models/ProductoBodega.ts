import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class ProductoBodega extends Model {
  public id!: number;
  public productos_id!: number;
  public bodegas_id!: number;
  public stock!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductoBodega.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    productos_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bodegas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "producto_bodegas",
    timestamps: true,
  }
);

export default ProductoBodega;

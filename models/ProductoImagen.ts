import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class ProductoImagen extends Model {
  public id!: number;
  public productos_id!: number;
  public nombre!: string;
  public url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ProductoImagen.init(
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
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "producto_imagenes",
    timestamps: true,
  }
);

export default ProductoImagen;

import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";


class Producto extends Model {
  public id!: number;
  public Categoria_id!: number;
  public marcas_id!: number;
  public codigo!: string;
  public nombre!: string;
  public precio_venta!: number;
  public Precio_compra_usd!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Producto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    marcas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    codigo: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    precio_venta: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Precio_compra_usd: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
    },
    eliminado:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  },
  {
    sequelize: db,
    tableName: "productos",
    timestamps: true,
  }
);

export default Producto;

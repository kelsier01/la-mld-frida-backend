import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";
import Categoria from "./Categoria";
import Marca from "./Marca";
import ProductoBodega from "./ProductoBodega";
import ProductoImagen from "./ProductoImagen";

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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "productos",
    timestamps: true,
  }
);

// Definir asociaciones
Producto.belongsTo(Categoria, { foreignKey: "Categoria_id", as: "categoria" });
Producto.belongsTo(Marca, { foreignKey: "marcas_id", as: "marca" });

Producto.hasMany(ProductoImagen, { foreignKey: "productos_id", as: "imagenes" });
Producto.hasMany(ProductoBodega, { foreignKey: "productos_id", as: "bodegas" });

export default Producto;

import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class DetallePedido extends Model {
  public id!: number;
  public pedidos_id!: number;
  public productos_id!: number;
  public cantidad!: number;
  public precio_venta!: number;
  public precio_compra_clp!: number;
  public precio_compra_usd!: number;
  public precio_compra_guia!: number;
  public adicional!: string;
  public bodegas_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DetallePedido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pedidos_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productos_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_venta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    precio_compra_clp: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    precio_compra_usd: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
    },
    precio_compra_guia: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
    },
    adicional: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    bodegas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "detalle_pedidos",
    timestamps: true,
  }
);

export default DetallePedido;

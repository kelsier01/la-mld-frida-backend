import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class Pedido extends Model {
  public id!: number;
  public empleados_id!: number;
  public clientes_id!: number;
  public estado_pedidos_id!: number;
  public deliverys_id!: number;
  public monto_total!: number;
  public documento_usa_id!: number;
  public n_despacho_chile!: string;
  public comprobante_ventas_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Pedido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    empleados_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clientes_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estado_pedidos_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deliverys_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    monto_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    guia_despacho_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tracking_number: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    comprobante_ventas_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    direccion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bodega_destino_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_entrega: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    eliminado: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize: db,
    tableName: "pedidos",
    timestamps: true,
  }
);

export default Pedido;

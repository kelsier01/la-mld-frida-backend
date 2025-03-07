import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";
import Empleado from "./Empleado";
import Cliente from "./Cliente";
import EstadoPedido from "./EstadoPedido";
import Delivery from "./Delivery";
import DocumentoUsa from "./GuiaDespacho";
import ComprobanteVenta from "./ComprobanteVenta";

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
      allowNull: false,
    },
    monto_total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    documento_usa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    n_despacho_chile: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    comprobante_ventas_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "pedidos",
    timestamps: true,
  }
);

// Relaciones con nombres
Pedido.belongsTo(Empleado, { foreignKey: 'empleados_id', as: 'empleado' });
Empleado.hasMany(Pedido, { foreignKey: 'empleados_id', as: 'pedidos' });

Pedido.belongsTo(Cliente, { foreignKey: 'clientes_id', as: 'cliente' });
Cliente.hasMany(Pedido, { foreignKey: 'clientes_id', as: 'pedidos' });

Pedido.belongsTo(EstadoPedido, { foreignKey: 'estado_pedidos_id', as: 'estadoPedido' });
EstadoPedido.hasMany(Pedido, { foreignKey: 'estado_pedidos_id', as: 'pedidos' });

Pedido.belongsTo(Delivery, { foreignKey: 'deliverys_id', as: 'delivery' });
Delivery.hasMany(Pedido, { foreignKey: 'deliverys_id', as: 'pedidos' });

Pedido.belongsTo(DocumentoUsa, { foreignKey: 'documento_usa_id', as: 'documentoUsa' });
DocumentoUsa.hasMany(Pedido, { foreignKey: 'documento_usa_id', as: 'pedidos' });

Pedido.belongsTo(ComprobanteVenta, { foreignKey: 'comprobante_ventas_id', as: 'comprobanteVenta' });
ComprobanteVenta.hasMany(Pedido, { foreignKey: 'comprobante_ventas_id', as: 'pedidos' });

export default Pedido;

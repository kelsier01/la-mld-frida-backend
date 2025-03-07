import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";
import Estados from "./EstadoPedido";

class LogEstadoPedido extends Model {
  public id!: number;
  public pedidos_id!: number;
  public estado_pedidos_id!: number;
  public empleados_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

LogEstadoPedido.init(
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
    estado_pedidos_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    empleados_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "log_estado_pedidos",
    timestamps: true,
  }
);

LogEstadoPedido.belongsTo(Estados, { foreignKey: 'estado_pedidos_id', as: 'estado' });



export default LogEstadoPedido;

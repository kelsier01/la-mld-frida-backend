import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class EstadoPedido extends Model {
  public id!: number;
  public estado_pedido!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

EstadoPedido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    estado_pedido: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "estado_pedidos",
    timestamps: true,
  }
);


export default EstadoPedido;

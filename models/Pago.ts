import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class Pago extends Model {
  public id!: number;
  public pedidos_id!: number;
  public monto!: number;
  public fecha_pago!: Date;
  public pago_parcializado!: boolean;
  public metodos_pago_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Pago.init(
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
    monto: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha_pago: {
      type: DataTypes.DATE,
      allowNull: true,
    
    },
    pago_parcializado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    metodos_pago_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "pagos",
    timestamps: true,
  }
);

export default Pago;

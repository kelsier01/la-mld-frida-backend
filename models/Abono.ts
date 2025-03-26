import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";
import Pago from "./Pago";

class Abono extends Model {
  public id!: number;
  public pagos_id!: number;
  public monto!: number;
  public fecha!: Date;
  public metodos_pago_id!: number;
  public empleados_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Abono.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pagos_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    monto: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    metodos_pago_id: {
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
    tableName: "abonos",
    timestamps: true,
  }
);

export default Abono;

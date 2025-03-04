import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class ComprobanteVenta extends Model {
  public id!: number;
  public codigo!: string;
  public estados_id!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ComprobanteVenta.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    estados_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "comprobante_ventas",
    timestamps: true,
  }
);

export default ComprobanteVenta;

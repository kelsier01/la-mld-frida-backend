import { DataTypes, Model } from "sequelize";
import db from "../BD/connection";

class MetodoPago extends Model {
  public id!: number;
  public nombre!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

MetodoPago.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "metodos_pagos",
    timestamps: true,
  }
);

export default MetodoPago;

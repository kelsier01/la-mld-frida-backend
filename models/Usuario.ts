import { DataTypes } from "sequelize";
import db from "../BD/connection";

const Users = db.define("usuario", {
  username: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  uid: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  isActive: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: true,
  },
  roles_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
// Sobrescribir el método toJSON para excluir el campo password
Users.prototype.toJSON = function () {
  var values = Object.assign({}, this.get());

  // Excluir el campo password
  delete values.password;

  return values;
};

export default Users;

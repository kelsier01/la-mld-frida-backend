import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Users from "../models/Usuario";

export const validarjwt = async (
  req: Request | any,
  res: Response,
  next: any
) => {
  const token = req.header("x-token");
  const privateKey: any = process.env.SECRETORPRIVATEKEY;

  if (!token) {
    return res.status(401).json({
      msg: "No existe Token en la peticion",
    });
  }

  try {
    const { id }: any = jwt.verify(token, privateKey);
    const user: any = await Users.findByPk(id);
    if (!user) {
      return res.status(401).json({
        msg: "Usuario no existe en la base de datos",
      });
    }

    if (user.isActive == 0) {
      return res.status(401).json({
        msg: "Token No Valido - Usuario desabilitado",
      });
    }
    req.user = <any>user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: token,
    });
  }
};

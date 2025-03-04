// import Users from "../models/usuario";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import Users from "../models/Usuario";
import { generarjwt } from "../helpers/generarJWT";
import { v4 as uuidv4 } from "uuid"; //LIBRERIA UUID

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user: any = await Users.findOne({
      where: { username },
    });
    if (!user || !user.username) {
      return res.status(400).json({
        msg: `El usuario con el username ${username} no existe`,
      });
    }
    if (user.isActive == 0) {
      return res.status(400).json({
        msg: `El usuario se encuentra deshabilitado`,
      });
    }

    // Comparación de la contraseña ingresada con la encriptada en la BD
    const validPassword = bcryptjs.compareSync(password, user.password);
    console.log(password, "Contraseña ingresada");
    console.log(user.password, "Contraseña usuario (hash)");

    if (!validPassword) {
      return res.status(400).json({
        msg: `La contraseña no es válida para este usuario`,
      });
    }

    // Generar token y responder al cliente
    const { id } = user;
    const name = user.username;
    const payload = { name, id };
    const token = await generarjwt(payload);

    res.json({
      msg: "login Ok",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal, hable con el administrador",
    });
  }
};

export const register = async (req: Request, res: Response) => {
  const { username, password, roles_id } = req.body;

  try {
    const user = await Users.findOne({
      where: { username },
    });

    if (user) {
      return res.status(400).json({
        msg: "Ya existe un usuario con este nombre " + username,
      });
    }

    const uuid = uuidv4();
    const shortUuid = uuid.slice(0, 8); // Limitar el UUID a los primeros 8 caracteres
    const salto = bcryptjs.genSaltSync();
    const passwordHash = bcryptjs.hashSync(password, salto);

    const newUser = {
      username,
      password: passwordHash,
      uid: shortUuid,
      isActive: 1,
      roles_id,
    };

    const userCreated = await Users.create(newUser);

    res.json({
      msg: "Usuario creado correctamente",
      pass: passwordHash,
      userCreated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Algo salió mal, hable con el administrador",
    });
  }
}

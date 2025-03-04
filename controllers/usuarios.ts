import Usuario from "../models/Usuario";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import Persona from "../models/Persona";
import { v4 as uuidv4 } from "uuid"; //LIBRERIA UUID
import Empleado from "../models/Empleado";
import rol from "../models/Rol";
import db from "../BD/connection"; // Tu conexión Sequelize

export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [
        {
          model: rol,
        },
        {
          model: Empleado,
          include: [Persona],
        },
      ],
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

export const getUsuarioById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id, {
      include: [
        {
          model: rol,
        },
        {
          model: Empleado,
          include: [Persona],
        },
      ],
    });
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

export const getUsarioByUid = async (req: Request, res: Response) => {
  const { uid }: any = req.params;
  const user: any = await Usuario.findOne({
    where: { uid },
    include: [
      {
        model: rol,
      },
      {
        model: Empleado,
        include: [Persona],
      },
    ],
  });

  if (user) {
    // if(user.personas.profesionales.habilitado){
    // res.json(user);
    res.json(user);
    // }else{
    //   res.status(404).json({
    //     msg: `El profesional ${user.personas.nombre} se encuentra deshabilitado`,
    //   });
    // }
  } else {
    res.status(404).json({
      msg: `No existe el usuario con la id ${uid}`,
    });
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    username,
    password,
    isActive,
    roles_id,
    nombre,
    correo,
    n_identificacion,
    fono,
  } = req.body;
  console.log("entro", req.body);

  // Iniciar una transacción
  const t = await db.transaction();

  try {
    const usuario = await Usuario.findByPk(id, { transaction: t });

    if (!usuario) {
      await t.rollback();
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Construcción dinámica de los datos a actualizar
    const updateUsuarioData: any = {};
    if (username) updateUsuarioData.username = username;
    if (password) updateUsuarioData.password = password;
    if (isActive !== undefined) updateUsuarioData.isActive = isActive;
    if (roles_id) updateUsuarioData.roles_id = roles_id;

    await usuario.update(updateUsuarioData, { transaction: t });

    // Buscar el Empleado vinculado al Usuario
    const empleado: any = await Empleado.findOne({
      where: { usuarios_id: id },
      transaction: t,
    });

    if (empleado) {
      const persona = await Persona.findByPk(empleado.personas_id, {
        transaction: t,
      });

      if (persona) {
        const updatePersonaData: any = {};
        if (nombre) updatePersonaData.nombre = nombre;
        if (correo) updatePersonaData.correo = correo;
        if (n_identificacion)
          updatePersonaData.n_identificacion = n_identificacion;
        if (fono) updatePersonaData.fono = fono;

        await persona.update(updatePersonaData, { transaction: t });
      }
    }

    // Confirmar la transacción
    await t.commit();

    return res
      .status(200)
      .json({ message: "Usuario y Persona actualizados correctamente" });
  } catch (error) {
    // Revertir cambios en caso de error
    await t.rollback();
    console.error("Error en updateUsuario:", error);
    return res.status(500).json({ message: "Error al actualizar", error });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      // await usuario.destroy();
      await usuario.update({ isActive: false });
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};

export const createUsuario = async (req: Request, res: Response) => {
  const { password, roles_id, nombre, correo, n_identificacion, fono } =
    req.body;
  const username = n_identificacion;
  // Iniciar una transacción
  const t = await db.transaction();

  try {
    // Validar si la persona ya existe por n_identificacion, correo o nombre
    const personaExistente = await Persona.findOne({
      where: {
        n_identificacion, // Buscar por RUT o identificación
      },
      transaction: t,
    });

    if (personaExistente) {
      await t.rollback();
      return res.status(400).json({
        message: "Ya existe una persona con esta identificación",
      });
    }

    // Encriptar la contraseña
    const uuid = uuidv4();
    const shortUuid = uuid.slice(0, 8); // Limitar el UUID a 8 caracteres
    const salto = bcryptjs.genSaltSync();
    const psswd = bcryptjs.hashSync(password, salto);

    // Crear Persona
    const nuevaPersona: any = await Persona.create(
      {
        nombre,
        correo,
        n_identificacion,
        fono,
      },
      { transaction: t }
    );

    // Crear Usuario
    const nuevoUsuario: any = await Usuario.create(
      {
        username,
        password: psswd,
        uid: shortUuid,
        isActive: 1,
        roles_id,
      },
      { transaction: t }
    );

    // Crear Empleado y asociarlo a Persona y Usuario
    await Empleado.create(
      {
        personas_id: nuevaPersona.id,
        usuarios_id: nuevoUsuario.id,
      },
      { transaction: t }
    );

    // Confirmar la transacción
    await t.commit();

    res.status(201).json({
      message: "Usuario, Persona y Empleado creados correctamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    await t.rollback(); // Revertir la transacción en caso de error
    console.error("Error en createUsuario:", error);
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

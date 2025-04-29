import Usuario from "../models/Usuario";
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";
import Persona from "../models/Persona";
import { v4 as uuidv4 } from "uuid"; //LIBRERIA UUID
import Empleado from "../models/Empleado";
import role from "../models/Rol";
import db from "../BD/connection"; // Tu conexión Sequelize
import { Op } from "sequelize";

export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const {
      search = "",
      page = "1",
      rol,
      limit = 10,
    } = req.query as {
      search?: string;
      page?: Number;
      rol?: Number;
      limit?: Number;
    };

    // Validación de la paginación
    const pageNumber = Number(page);
    let rolNumber = rol == 0 ? undefined : Number(rol);
    let validRol = rol == 0 ? false : true;
    const offset = (pageNumber - 1) * Number(limit);
    let limite = Number(limit);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res
        .status(400)
        .json({ error: "El parámetro 'page' debe ser un número positivo." });
    }
    // Construcción de la condición de búsqueda en Persona
    const personaWhere: any = search
      ? {
          [Op.or]: [
            { nombre: { [Op.like]: `%${search}%` } },
            { n_identificacion: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    // Construcción de la condición de búsqueda en Direccion
    const rolWhere: any = {
      ...(rolNumber && { roles_id: rolNumber }),
    };

    const { rows: usuarios, count: total } = await Usuario.findAndCountAll({
      where: rolWhere,
      include: [
        {
          model: role,
        },
        {
          model: Empleado,
          include: [
            {
              model: Persona,
              where: personaWhere,
              required: true, // INNER JOIN para que solo traiga clientes con Persona asociada
            },
          ],
        },
      ],
      limit: limite,
      offset,
    });

    return res.json({
      usuarios,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / Number(limit)),
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
          model: role,
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
        model: role,
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

  const t = await db.transaction();

  try {
    // Buscar si ya existe la persona
    const personaExistente: any = await Persona.findOne({
      where: { n_identificacion },
      transaction: t,
    });

    // Si existe la persona
    if (personaExistente) {
      // Verificar si también es usuario
      const usuarioExistente = await Usuario.findOne({
        where: { username },
        transaction: t,
      });

      // Si ya existe como usuario también, error
      if (usuarioExistente) {
        await t.rollback();
        return res.status(400).json({
          message: "La persona ya está registrada como usuario",
        });
      }

      // Si solo existe la persona: crear usuario y empleado
      const uuid = uuidv4().slice(0, 8);
      const psswd = bcryptjs.hashSync(password, bcryptjs.genSaltSync());

      const nuevoUsuario: any = await Usuario.create(
        {
          username,
          password: psswd,
          uid: uuid,
          isActive: 1,
          roles_id,
        },
        { transaction: t }
      );

      await Empleado.create(
        {
          personas_id: personaExistente.id,
          usuarios_id: nuevoUsuario.id,
        },
        { transaction: t }
      );

      await t.commit();
      return res.status(201).json({
        message: "Usuario y Empleado creados para persona existente",
        usuario: nuevoUsuario,
      });
    }

    // Si no existe la persona, crear todo desde cero
    const nuevaPersona: any = await Persona.create(
      {
        nombre,
        correo,
        n_identificacion,
        fono,
      },
      { transaction: t }
    );

    const uuid = uuidv4().slice(0, 8);
    const psswd = bcryptjs.hashSync(password, bcryptjs.genSaltSync());

    const nuevoUsuario: any = await Usuario.create(
      {
        username,
        password: psswd,
        uid: uuid,
        isActive: 1,
        roles_id,
      },
      { transaction: t }
    );

    await Empleado.create(
      {
        personas_id: nuevaPersona.id,
        usuarios_id: nuevoUsuario.id,
      },
      { transaction: t }
    );

    await t.commit();
    res.status(201).json({
      message: "Persona, Usuario y Empleado creados correctamente",
      usuario: nuevoUsuario,
    });
  } catch (error) {
    await t.rollback();
    console.error("Error en createUsuario:", error);
    res.status(500).json({
      message: "Error al crear el usuario",
      error,
    });
  }
};

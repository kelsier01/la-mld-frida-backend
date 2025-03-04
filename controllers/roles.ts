import { Request, Response } from "express";
import Rol from "../models/Rol";

export const getAllRoles = async (req: Request, res: Response) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los roles", error });
  }
};

export const getRolById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rol = await Rol.findByPk(id);
    if (rol) {
      res.status(200).json(rol);
    } else {
      res.status(404).json({ message: "Rol no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el rol", error });
  }
};

export const createRol = async (req: Request, res: Response) => {
  const { rol } = req.body;
  try {
    const nuevoRol = await Rol.create({ rol });
    res.status(201).json(nuevoRol);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el rol", error });
  }
};

export const updateRol = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rol } = req.body;
  try {
    const rolExistente = await Rol.findByPk(id);
    if (rolExistente) {
      await rolExistente.update({ rol });
      res.status(200).json(rolExistente);
    } else {
      res.status(404).json({ message: "Rol no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el rol", error });
  }
};

export const deleteRol = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const rol = await Rol.findByPk(id);
    if (rol) {
      // await rol.destroy();
      res.status(200).json({ message: "Rol eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Rol no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el rol", error });
  }
};

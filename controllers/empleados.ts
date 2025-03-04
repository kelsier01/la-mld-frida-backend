import { Request, Response } from "express";
import Empleado from "../models/Empleado";

export const getAllEmpleados = async (req: Request, res: Response) => {
  try {
    const empleados = await Empleado.findAll();
    res.status(200).json(empleados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los empleados", error });
  }
};

export const getEmpleadoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const empleado = await Empleado.findByPk(id);
    if (empleado) {
      res.status(200).json(empleado);
    } else {
      res.status(404).json({ message: "Empleado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el empleado", error });
  }
};

export const createEmpleado = async (req: Request, res: Response) => {
  const { personas_id, usuarios_id } = req.body;
  try {
    const nuevoEmpleado = await Empleado.create({
      personas_id,
      usuarios_id,
    });
    res.status(201).json(nuevoEmpleado);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el empleado", error });
  }
};

export const updateEmpleado = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { personas_id, usuarios_id } = req.body;
  try {
    const empleado = await Empleado.findByPk(id);
    if (empleado) {
      await empleado.update({ personas_id, usuarios_id });
      res.status(200).json(empleado);
    } else {
      res.status(404).json({ message: "Empleado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el empleado", error });
  }
};

export const deleteEmpleado = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const empleado = await Empleado.findByPk(id);
    if (empleado) {
      // await empleado.destroy();
      await empleado.update({ eliminado: true });

      res.status(200).json({ message: "Empleado eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Empleado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el empleado", error });
  }
};

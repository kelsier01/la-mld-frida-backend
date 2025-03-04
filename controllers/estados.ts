import { Request, Response } from "express";
import Estado from "../models/Estado";

export const getAllEstados = async (req: Request, res: Response) => {
  try {
    const estados = await Estado.findAll();
    res.status(200).json(estados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los estados", error });
  }
};

export const getEstadoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const estado = await Estado.findByPk(id);
    if (estado) {
      res.status(200).json(estado);
    } else {
      res.status(404).json({ message: "Estado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el estado", error });
  }
};

export const createEstado = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  try {
    const nuevoEstado = await Estado.create({ nombre });
    res.status(201).json(nuevoEstado);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el estado", error });
  }
};

export const updateEstado = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const estado = await Estado.findByPk(id);
    if (estado) {
      await estado.update({ nombre });
      res.status(200).json(estado);
    } else {
      res.status(404).json({ message: "Estado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el estado", error });
  }
};

export const deleteEstado = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const estado = await Estado.findByPk(id);
    if (estado) {
      await estado.destroy();
      res.status(200).json({ message: "Estado eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Estado no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el estado", error });
  }
};

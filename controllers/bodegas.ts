import { Request, Response } from "express";
import Bodega from "../models/Bodega";

export const getAllBodegas = async (req: Request, res: Response) => {
  try {
    const bodegas = await Bodega.findAll();
    res.status(200).json(bodegas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las bodegas", error });
  }
};

export const getBodegaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bodega = await Bodega.findByPk(id);
    if (bodega) {
      res.status(200).json(bodega);
    } else {
      res.status(404).json({ message: "Bodega no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la bodega", error });
  }
};

export const createBodega = async (req: Request, res: Response) => {
  const { nombre, ubicacion } = req.body;
  try {
    const nuevaBodega = await Bodega.create({ nombre, ubicacion });
    res.status(201).json(nuevaBodega);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la bodega", error });
  }
};

export const updateBodega = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, ubicacion } = req.body;
  try {
    const bodega = await Bodega.findByPk(id);
    if (bodega) {
      await bodega.update({ nombre, ubicacion });
      res.status(200).json(bodega);
    } else {
      res.status(404).json({ message: "Bodega no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la bodega", error });
  }
};

export const deleteBodega = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bodega = await Bodega.findByPk(id);
    if (bodega) {
      await bodega.destroy();
      res.status(200).json({ message: "Bodega eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Bodega no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la bodega", error });
  }
};

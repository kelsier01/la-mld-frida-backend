import { Request, Response } from "express";
import Region from "../models/Region"; // Asegúrate de importar el modelo Region

export const getAllRegiones = async (req: Request, res: Response) => {
  try {
    const regiones = await Region.findAll();
    res.status(200).json(regiones);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las regiones", error });
  }
};

export const getRegionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const region = await Region.findByPk(id);
    if (region) {
      res.status(200).json(region);
    } else {
      res.status(404).json({ message: "Región no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la región", error });
  }
};

export const createRegion = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  try {
    const nuevaRegion = await Region.create({ nombre });
    res.status(201).json(nuevaRegion);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la región", error });
  }
};

export const updateRegion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const region = await Region.findByPk(id);
    if (region) {
      await region.update({ nombre });
      res.status(200).json(region);
    } else {
      res.status(404).json({ message: "Región no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la región", error });
  }
};

export const deleteRegion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const region = await Region.findByPk(id);
    if (region) {
      await region.destroy();
      res.status(200).json({ message: "Región eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Región no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la región", error });
  }
};
import { Request, Response } from "express";
import Marca from "../models/Marca";

export const getAllMarcas = async (req: Request, res: Response) => {
  try {
    const marcas = await Marca.findAll();
    res.status(200).json(marcas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las marcas", error });
  }
};

export const getMarcaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const marca = await Marca.findByPk(id);
    if (marca) {
      res.status(200).json(marca);
    } else {
      res.status(404).json({ message: "Marca no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la marca", error });
  }
};

export const createMarca = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  try {
    const nuevaMarca = await Marca.create({ nombre });
    res.status(201).json(nuevaMarca);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la marca", error });
  }
};

export const updateMarca = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const marca = await Marca.findByPk(id);
    if (marca) {
      await marca.update({ nombre });
      res.status(200).json(marca);
    } else {
      res.status(404).json({ message: "Marca no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la marca", error });
  }
};

export const deleteMarca = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const marca = await Marca.findByPk(id);
    if (marca) {
      await marca.destroy();
      res.status(200).json({ message: "Marca eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Marca no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la marca", error });
  }
};

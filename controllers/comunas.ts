import { Request, Response } from "express";
import Comuna from "../models/Comuna"; // Importamos el modelo Comuna

// Obtener todas las comunas
export const getAllComunas = async (req: Request, res: Response) => {
  try {
    const comunas = await Comuna.findAll();
    res.status(200).json(comunas);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener las comunas",
      error,
    });
  }
};

// Obtener una comuna por ID
export const getComunaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comuna = await Comuna.findByPk(id);
    if (comuna) {
      res.status(200).json(comuna);
    } else {
      res.status(404).json({ message: "Comuna no encontrada" });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener la comuna",
      error,
    });
  }
};

// Crear una nueva comuna
export const createComuna = async (req: Request, res: Response) => {
  const { nombre, region_id } = req.body;

  try {
    const nuevaComuna = await Comuna.create({
      nombre,
      region_id,
    });

    res.status(201).json(nuevaComuna);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la comuna",
      error,
    });
  }
};

// Actualizar una comuna existente
export const updateComuna = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, region_id } = req.body;

  try {
    const comuna = await Comuna.findByPk(id);

    if (!comuna) {
      return res.status(404).json({ message: "Comuna no encontrada" });
    }

    await comuna.update({
      nombre,
      region_id,
    });

    res.status(200).json(comuna);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la comuna",
      error,
    });
  }
};

// Eliminar una comuna
export const deleteComuna = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const comuna = await Comuna.findByPk(id);

    if (!comuna) {
      return res.status(404).json({ message: "Comuna no encontrada" });
    }

    await comuna.destroy();

    res.status(200).json({ message: "Comuna eliminada correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la comuna",
      error,
    });
  }
};

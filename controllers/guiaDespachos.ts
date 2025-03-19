import { Request, Response } from "express";
import GuiaDespacho from "../models/GuiaDespacho";

export const getAllGuiasDespacho = async (req: Request, res: Response) => {
  try {
    const guiasDespacho = await GuiaDespacho.findAll();
    res.status(200).json(guiasDespacho);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las guías de despacho", error });
  }
};

export const getGuiaDespachoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const guiaDespacho = await GuiaDespacho.findByPk(id);
    if (guiaDespacho) {
      res.status(200).json(guiaDespacho);
    } else {
      res.status(404).json({ message: "Guía de despacho no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la guía de despacho", error });
  }
};

export const createGuiaDespacho = async (req: Request, res: Response) => {
  const { codigo, estados_id, subtotal, insurage, other, total } = req.body;
  try {
    const nuevaGuiaDespacho = await GuiaDespacho.create({ codigo, estados_id, subtotal, insurage, other, total });
    res.status(201).json(nuevaGuiaDespacho);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la guía de despacho", error });
  }
};

export const updateGuiaDespacho = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { codigo, estados_id } = req.body;
  try {
    const guiaDespacho = await GuiaDespacho.findByPk(id);
    if (guiaDespacho) {
      await guiaDespacho.update({ codigo, estados_id });
      res.status(200).json(guiaDespacho);
    } else {
      res.status(404).json({ message: "Guía de despacho no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la guía de despacho", error });
  }
};

export const deleteGuiaDespacho = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const guiaDespacho = await GuiaDespacho.findByPk(id);
    if (guiaDespacho) {
      await guiaDespacho.destroy();
      res
        .status(200)
        .json({ message: "Guía de despacho eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Guía de despacho no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la guía de despacho", error });
  }
};

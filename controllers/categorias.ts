import { Request, Response } from "express";
import Categoria from "../models/Categoria";

export const getAllCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las categorías", error });
  }
};

export const getCategoriaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la categoría", error });
  }
};

export const createCategoria = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  try {
    const nuevaCategoria = await Categoria.create({ nombre });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la categoría", error });
  }
};

export const updateCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      await categoria.update({ nombre });
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la categoría", error });
  }
};

export const deleteCategoria = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      await categoria.destroy();
      res.status(200).json({ message: "Categoría eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la categoría", error });
  }
};

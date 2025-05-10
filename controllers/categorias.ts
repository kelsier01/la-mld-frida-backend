import { NextFunction, Request, Response } from "express";
import Categoria from "../models/Categoria";
import { Op } from "sequelize";

export const getAllCategorias = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      search = "",
      page = "1",
      limit = 20,
    } = req.query as {
      search?: string;
      page?: Number;
      limit?: Number;
    };
    // Validación de la paginación
    const pageNumber = Number(page);
    if (isNaN(pageNumber) || pageNumber < 1) {
      return res
        .status(400)
        .json({ error: "El parámetro 'page' debe ser un número positivo." });
    }

    const offset = (pageNumber - 1) * Number(limit);
    const limite = Number(limit);
    // Construcción de la condición de búsqueda en Persona

    const categoriaWhere: any = {
      eliminado: {
        [Op.ne]: 1,
      },
      ...(search ? { nombre: { [Op.like]: `%${search}%` } } : {}),
    };

    // Ejecución de la consulta con Sequelize
    const { rows: categorias, count: total } = await Categoria.findAndCountAll({
      where: categoriaWhere,
      limit: limite,
      offset,
      distinct: true,
      order: [["nombre", "ASC"]],
    });
    return res.json({
      categorias,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las categorías", error });
    next(error); // Delegar el error al middleware de manejo de errores
  }
};

export const getCategorias = async (req: Request, res: Response) => {
  try {
    const categorias = await Categoria.findAll({
      where: {
        eliminado: {
          [Op.ne]: 1,
        },
      },
      order: [["nombre", "DESC"]], // ASC para orden ascendente, DESC para descendente
    });
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
      // await categoria.destroy();
      categoria.update({ eliminado: true });
      res.status(200).json({ message: "Categoría eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la categoría", error });
  }
};

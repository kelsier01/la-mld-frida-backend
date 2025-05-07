import { NextFunction, Request, Response } from "express";
import Marca from "../models/Marca";
import { Op } from "sequelize";

export const getAllMarcas = async (
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
    const marcaWhere: any = {
      eliminado: {
        [Op.ne]: 1,
      },
      ...(search ? { nombre: { [Op.like]: `%${search}%` } } : {}),
    };

    // Ejecución de la consulta con Sequelize
    const { rows: marcas, count: total } = await Marca.findAndCountAll({
      where: marcaWhere,
      limit: limite,
      offset,
      distinct: true,
      order: [["nombre", "ASC"]], // ASC para orden ascendente, DESC para descendente
    });

    // const marcas = await Marca.findAll();
    return res.json({
      marcas,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las marcas", error });
    next(error); // Delegar el error al middleware de manejo de errores
  }
};

export const getMarcas = async (req: Request, res: Response) => {
  try {
    const marcas = await Marca.findAll({
      where: {
        eliminado: {
          [Op.ne]: 1,
        },
      },
      order: [["nombre", "DESC"]], // ASC para orden ascendente, DESC para descendente
    });

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
  console.log("ID a eliminar:", id);
  try {
    const marca = await Marca.findByPk(id);
    if (marca) {
      // await marca.destroy();
      await marca.update({ eliminado: true });
      res.status(200).json({ message: "Marca eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Marca no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la marca", error });
  }
};

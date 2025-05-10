import { Request, Response, NextFunction } from "express";
import Delivery from "../models/Delivery";
import { Op } from "sequelize";

export const getAllDeliverys = async (req: Request, res: Response) => {
  try {
    const deliverys = await Delivery.findAll({
      where: {
        eliminado: {
          [Op.ne]: 1,
        },
      },
      order: [["empresa", "ASC"]], // ASC para orden ascendente, DESC para descendente
    });
    res.status(200).json(deliverys);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los deliverys", error });
  }
};

export const getDeliverys = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = "1", limit = 20 } = req.query as {
      page?: Number;
      limit?: Number;
    };
    console.log("page", page);
    console.log("limit", limit);
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

    const deliveryWhere: any = {
      eliminado: {
        [Op.ne]: 1,
      },
    };

    // Ejecución de la consulta con Sequelize
    const { rows: deliverys, count: total } = await Delivery.findAndCountAll({
      where: deliveryWhere,
      limit: limite,
      offset,
      distinct: true,
      order: [["empresa", "ASC"]],
    });
    return res.json({
      deliverys,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los deliverys", error });
    next(error); // Delegar el error al middleware de manejo de errores
  }
};

export const getDeliveryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const delivery = await Delivery.findByPk(id);
    if (delivery) {
      res.status(200).json(delivery);
    } else {
      res.status(404).json({ message: "Delivery no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el delivery", error });
  }
};

export const createDelivery = async (req: Request, res: Response) => {
  const { empresa } = req.body;
  try {
    const nuevoDelivery = await Delivery.create({ empresa });
    res.status(201).json(nuevoDelivery);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el delivery", error });
  }
};

export const updateDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { empresa } = req.body;
  try {
    const delivery = await Delivery.findByPk(id);
    if (delivery) {
      await delivery.update({ empresa });
      res.status(200).json(delivery);
    } else {
      res.status(404).json({ message: "Delivery no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el delivery", error });
  }
};

export const deleteDelivery = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const delivery = await Delivery.findByPk(id);
    if (delivery) {
      // await delivery.destroy();
      await delivery.update({ eliminado: 1 });
      res.status(200).json({ message: "Delivery eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Delivery no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el delivery", error });
  }
};

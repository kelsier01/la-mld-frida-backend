import { NextFunction, Request, Response } from "express";
import GuiaDespacho from "../models/GuiaDespacho";
import Estado from "../models/Estado";
import Region from "../models/Region";
import Pedido from "../models/Pedido";
import Direccion from "../models/Direccion";
import { Op } from "sequelize";

export const getAllGuiasDespacho = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      search = "",
      page = "1",
      estadoId,
      regionId,
      limit = 10,
    } = req.query as {
      search?: string;
      page?: string;
      estadoId?: number;
      regionId?: number;
      limit?: number;
    };

    const pageNumber = Number(page);
    const estado = estadoId != 0 ? estadoId : "";
    const region = regionId != 0 ? regionId : "";

    console.log(
      `estado = ${estado} - region = ${region}`
    );

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res
        .status(400)
        .json({ error: "El parámetro 'page' debe ser un número positivo." });
    }
    const offset = (pageNumber - 1) * Number(limit);
    const limite = Number(limit);

    // Construcción de la condición de búsqueda en GuiaDespacho
    const guiaDespachoWhere: any = {
      ...(search &&
        search.trim() && { codigo: { [Op.like]: `%${search.trim()}%` } }),
      ...(estado && { estados_id: estado }),
    };

    // Construcción de la condición de búsqueda en Direccion por región
    const direccionWhere: any = {
      ...(region && { region_id: region }),
    };

    const { rows: guiasDespacho, count: total } = await GuiaDespacho.findAndCountAll({
      where: guiaDespachoWhere,
      include: [
        {
          model: Estado,
        },
        {
          model: Pedido,
          include: [
            {
              model: Direccion,
              where: Object.keys(direccionWhere).length > 0 ? direccionWhere : undefined,
              include: [
                {
                  model: Region,
                }
              ]
            }
          ]
        }
      ],
      order: [["id", "DESC"]],
      limit: limite,
      offset,
      distinct: true,
    });

    res.status(200).json({
      guiasDespacho,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error al obtener las guías de despacho"
    });
  }
};

export const getGuiaDespachoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const guiaDespacho = await GuiaDespacho.findByPk(id, {
      include: [
        {
          model: Estado,
        },
        {
          model: Pedido,
          as: 'Pedidos',
          include: [
            {
              model: Direccion,
              include: [
                {
                  model: Region,
                }
              ]
            }
          ]
        }
      ],
    });
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
    const nuevaGuiaDespacho = await GuiaDespacho.create({ 
      codigo, 
      estados_id, 
      subtotal, 
      insurage, 
      other, 
      total 
    });
    res.status(201).json(nuevaGuiaDespacho);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear la guía de despacho", error });
  }
};

export const updateGuiaDespacho = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { codigo, estados_id, subtotal, insurage, other, total } = req.body;
  try {
    const guiaDespacho = await GuiaDespacho.findByPk(id);
    if (guiaDespacho) {
      await guiaDespacho.update({ 
        codigo, 
        estados_id,
        subtotal,
        insurage,
        other,
        total 
      });
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

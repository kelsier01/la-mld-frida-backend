import { Request, Response } from "express";
import Direccion from "../models/Direccion";
import Region from "../models/Region";
import Comuna from "../models/Comuna";

export const getAllDirecciones = async (req: Request, res: Response) => {
  try {
    const direcciones = await Direccion.findAll();
    res.status(200).json(direcciones);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las direcciones", error });
  }
};

export const getDireccionById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const direccion = await Direccion.findByPk(id);
    if (direccion) {
      res.status(200).json(direccion);
    } else {
      res.status(404).json({ message: "Dirección no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la dirección", error });
  }
};

export const createDireccion = async (req: Request, res: Response) => {
  const { clientes_id, direccion, region_id, comuna_id } = req.body;
  try {
    const nuevaDireccion = await Direccion.create({
      clientes_id,
      direccion,
      region_id,
      comuna_id,
    });

    const region = await Region.findByPk(region_id);
    const comuna = await Comuna.findByPk(comuna_id);


    res.status(201).json({nuevaDireccion, region, comuna});
  } catch (error) {
    res.status(500).json({ message: "Error al crear la dirección", error });
  }
};

export const updateDireccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { clientes_id, direccion, region, comuna } = req.body;
  try {
    const direccionExistente = await Direccion.findByPk(id);
    if (direccionExistente) {
      await direccionExistente.update({
        clientes_id,
        direccion,
        region,
        comuna,
      });
      res.status(200).json(direccionExistente);
    } else {
      res.status(404).json({ message: "Dirección no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la dirección", error });
  }
};

export const deleteDireccion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const direccion = await Direccion.findByPk(id);
    if (direccion) {
      await direccion.destroy();
      res.status(200).json({ message: "Dirección eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Dirección no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la dirección", error });
  }
};

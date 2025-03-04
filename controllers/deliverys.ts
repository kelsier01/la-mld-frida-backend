import { Request, Response } from "express";
import Delivery from "../models/Delivery";

export const getAllDeliverys = async (req: Request, res: Response) => {
  try {
    const deliverys = await Delivery.findAll();
    res.status(200).json(deliverys);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los deliverys", error });
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
      await delivery.destroy();
      res.status(200).json({ message: "Delivery eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Delivery no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el delivery", error });
  }
};

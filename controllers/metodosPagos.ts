import { Request, Response } from "express";
import MetodoPago from "../models/MetodoPago";

export const getAllMetodosPago = async (req: Request, res: Response) => {
  try {
    const metodosPago = await MetodoPago.findAll();
    res.status(200).json(metodosPago);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los métodos de pago", error });
  }
};

export const getMetodoPagoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const metodoPago = await MetodoPago.findByPk(id);
    if (metodoPago) {
      res.status(200).json(metodoPago);
    } else {
      res.status(404).json({ message: "Método de pago no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el método de pago", error });
  }
};

export const createMetodoPago = async (req: Request, res: Response) => {
  const { nombre } = req.body;
  try {
    const nuevoMetodoPago = await MetodoPago.create({ nombre });
    res.status(201).json(nuevoMetodoPago);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el método de pago", error });
  }
};

export const updateMetodoPago = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const metodoPago = await MetodoPago.findByPk(id);
    if (metodoPago) {
      await metodoPago.update({ nombre });
      res.status(200).json(metodoPago);
    } else {
      res.status(404).json({ message: "Método de pago no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el método de pago", error });
  }
};

export const deleteMetodoPago = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const metodoPago = await MetodoPago.findByPk(id);
    if (metodoPago) {
      await metodoPago.destroy();
      res
        .status(200)
        .json({ message: "Método de pago eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Método de pago no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el método de pago", error });
  }
};

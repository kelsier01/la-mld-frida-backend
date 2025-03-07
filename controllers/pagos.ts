import { Request, Response } from "express";
import Pago from "../models/Pago";

export const getAllPagos = async (req: Request, res: Response) => {
  try {
    const pagos = await Pago.findAll();
    res.status(200).json(pagos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pagos", error });
  }
};

export const getPagoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pago = await Pago.findByPk(id);
    if (pago) {
      res.status(200).json(pago);
    } else {
      res.status(404).json({ message: "Pago no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pago", error });
  }
};

export const createPago = async (req: Request, res: Response) => {
  const { pedidos_id, monto, pago_parcializado, metodos_pago_id } =
    req.body;
  try {
    const nuevoPago = await Pago.create({
      pedidos_id,
      monto,
      pago_parcializado,
      metodos_pago_id,
    });
    res.status(201).json(nuevoPago);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el pago", error });
  }
};

export const updatePago = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { pedidos_id, monto, fecha_pago, pago_parcializado, metodos_pago_id } =
    req.body;
  try {
    const pago = await Pago.findByPk(id);
    if (pago) {
      await pago.update({
        pedidos_id,
        monto,
        fecha_pago,
        pago_parcializado,
        metodos_pago_id,
      });
      res.status(200).json(pago);
    } else {
      res.status(404).json({ message: "Pago no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pago", error });
  }
};

export const deletePago = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pago = await Pago.findByPk(id);
    if (pago) {
      await pago.destroy();
      res.status(200).json({ message: "Pago eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Pago no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el pago", error });
  }
};

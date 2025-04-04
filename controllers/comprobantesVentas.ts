import { Request, Response } from "express";
import ComprobanteVenta from "../models/ComprobanteVenta";

export const getAllComprobantesVenta = async (req: Request, res: Response) => {
  try {
    const comprobantesVenta = await ComprobanteVenta.findAll();
    res.status(200).json(comprobantesVenta);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los comprobantes de venta", error });
  }
};

export const getComprobanteVentaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comprobanteVenta = await ComprobanteVenta.findByPk(id);
    if (comprobanteVenta) {
      res.status(200).json(comprobanteVenta);
    } else {
      res.status(404).json({ message: "Comprobante de venta no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el comprobante de venta", error });
  }
};

export const createComprobanteVenta = async (req: Request, res: Response) => {
  const { codigo, estados_id } = req.body;
  try {
    const ultimoId = await ComprobanteVenta.max("id") as number;
    const nuevoComprobanteVenta = await ComprobanteVenta.create({
      codigo: `${codigo}${ultimoId + 1}`,
      estados_id,
    });
    res.status(201).json(nuevoComprobanteVenta);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el comprobante de venta", error });
  }
};

export const updateComprobanteVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { codigo, estados_id } = req.body;
  try {
    const comprobanteVenta = await ComprobanteVenta.findByPk(id);
    if (comprobanteVenta) {
      await comprobanteVenta.update({ codigo, estados_id });
      res.status(200).json(comprobanteVenta);
    } else {
      res.status(404).json({ message: "Comprobante de venta no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el comprobante de venta", error });
  }
};

export const deleteComprobanteVenta = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const comprobanteVenta = await ComprobanteVenta.findByPk(id);
    if (comprobanteVenta) {
      await comprobanteVenta.destroy();
      res
        .status(200)
        .json({ message: "Comprobante de venta eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Comprobante de venta no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el comprobante de venta", error });
  }
};

import { Request, Response } from "express";
import DetallePedido from "../models/DetallePedido";

export const getAllDetallePedidos = async (req: Request, res: Response) => {
  try {
    const detallePedidos = await DetallePedido.findAll();
    res.status(200).json(detallePedidos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los detalles de pedido", error });
  }
};

export const getDetallePedidoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const detallePedido = await DetallePedido.findByPk(id);
    if (detallePedido) {
      res.status(200).json(detallePedido);
    } else {
      res.status(404).json({ message: "Detalle de pedido no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el detalle de pedido", error });
  }
};

export const createDetallePedido = async (req: Request, res: Response) => {
  const {
    pedidos_id,
    productos_id,
    cantidad,
    precio_venta,
    precio_compra_clp,
    precio_compra_usd,
    precio_compra_guia,
    adicional,
    bodegas_id,
  } = req.body;
  try {
    const nuevoDetallePedido = await DetallePedido.create({
      pedidos_id,
      productos_id,
      cantidad,
      precio_venta,
      precio_compra_clp,
      precio_compra_usd,
      precio_compra_guia,
      adicional,
      bodegas_id,
    });
    res.status(201).json(nuevoDetallePedido);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el detalle de pedido", error });
  }
};

export const updateDetallePedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    pedidos_id,
    productos_id,
    cantidad,
    precio_venta,
    precio_compra_clp,
    precio_compra_usd,
    precio_compra_guia,
    adicional,
    bodegas_id,
  } = req.body;
  try {
    const detallePedido = await DetallePedido.findByPk(id);
    if (detallePedido) {
      await detallePedido.update({
        pedidos_id,
        productos_id,
        cantidad,
        precio_venta,
        precio_compra_clp,
        precio_compra_usd,
        precio_compra_guia,
        adicional,
        bodegas_id,
      });
      res.status(200).json(detallePedido);
    } else {
      res.status(404).json({ message: "Detalle de pedido no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el detalle de pedido", error });
  }
};

export const deleteDetallePedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const detallePedido = await DetallePedido.findByPk(id);
    if (detallePedido) {
      await detallePedido.destroy();
      res
        .status(200)
        .json({ message: "Detalle de pedido eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Detalle de pedido no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el detalle de pedido", error });
  }
};

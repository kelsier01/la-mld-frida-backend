import { Request, Response } from "express";
import EstadoPedido from "../models/EstadoPedido";

export const getAllEstadoPedidos = async (req: Request, res: Response) => {
  try {
    const estadoPedidos = await EstadoPedido.findAll();
    res.status(200).json(estadoPedidos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los estados de pedidos", error });
  }
};

export const getEstadoPedidoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const estadoPedido = await EstadoPedido.findByPk(id);
    if (estadoPedido) {
      res.status(200).json(estadoPedido);
    } else {
      res.status(404).json({ message: "Estado de pedido no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el estado de pedido", error });
  }
};

export const createEstadoPedido = async (req: Request, res: Response) => {
  const { estado_pedido } = req.body;
  try {
    const nuevoEstadoPedido = await EstadoPedido.create({ estado_pedido });
    res.status(201).json(nuevoEstadoPedido);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el estado de pedido", error });
  }
};

export const updateEstadoPedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado_pedido } = req.body;
  try {
    const estadoPedido = await EstadoPedido.findByPk(id);
    if (estadoPedido) {
      await estadoPedido.update({ estado_pedido });
      res.status(200).json(estadoPedido);
    } else {
      res.status(404).json({ message: "Estado de pedido no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el estado de pedido", error });
  }
};

export const deleteEstadoPedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const estadoPedido = await EstadoPedido.findByPk(id);
    if (estadoPedido) {
      await estadoPedido.destroy();
      res
        .status(200)
        .json({ message: "Estado de pedido eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Estado de pedido no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el estado de pedido", error });
  }
};

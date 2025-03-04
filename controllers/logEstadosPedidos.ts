import { Request, Response } from "express";
import LogEstadoPedido from "../models/LogEstadoPedido";

export const getAllLogEstadoPedidos = async (req: Request, res: Response) => {
  try {
    const logEstadoPedidos = await LogEstadoPedido.findAll();
    res.status(200).json(logEstadoPedidos);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al obtener los logs de estado de pedido",
        error,
      });
  }
};

export const getLogEstadoPedidoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const logEstadoPedido = await LogEstadoPedido.findByPk(id);
    if (logEstadoPedido) {
      res.status(200).json(logEstadoPedido);
    } else {
      res
        .status(404)
        .json({ message: "Log de estado de pedido no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el log de estado de pedido", error });
  }
};

export const createLogEstadoPedido = async (req: Request, res: Response) => {
  const { pedidos_id, estado_pedidos_id, empleados_id } = req.body;
  try {
    const nuevoLogEstadoPedido = await LogEstadoPedido.create({
      pedidos_id,
      estado_pedidos_id,
      empleados_id,
    });
    res.status(201).json(nuevoLogEstadoPedido);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el log de estado de pedido", error });
  }
};

export const updateLogEstadoPedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { pedidos_id, estado_pedidos_id, empleados_id } = req.body;
  try {
    const logEstadoPedido = await LogEstadoPedido.findByPk(id);
    if (logEstadoPedido) {
      await logEstadoPedido.update({
        pedidos_id,
        estado_pedidos_id,
        empleados_id,
      });
      res.status(200).json(logEstadoPedido);
    } else {
      res
        .status(404)
        .json({ message: "Log de estado de pedido no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error al actualizar el log de estado de pedido",
        error,
      });
  }
};

export const deleteLogEstadoPedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const logEstadoPedido = await LogEstadoPedido.findByPk(id);
    if (logEstadoPedido) {
      await logEstadoPedido.destroy();
      res
        .status(200)
        .json({ message: "Log de estado de pedido eliminado correctamente" });
    } else {
      res
        .status(404)
        .json({ message: "Log de estado de pedido no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el log de estado de pedido", error });
  }
};

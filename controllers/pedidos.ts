import { Request, Response } from "express";
import Pedido from "../models/Pedido";
import Cliente from "../models/Cliente";
import ComprobanteVenta from "../models/ComprobanteVenta";
import Delivery from "../models/Delivery";
import Empleado from "../models/Empleado";
import EstadoPedido from "../models/EstadoPedido";
import GuiaDespacho from "../models/GuiaDespacho";
import Persona from "../models/Persona";

export const getAllPedidos = async (req: Request, res: Response) => {
  try {
    const pedidos = await Pedido.findAll({
      include: [
      { model: Empleado, as: 'empleado' },
      { 
        model: Cliente, 
        as: 'cliente',
        include: [{ model: Persona, as: 'persona' }]
      },
      { model: EstadoPedido, as: 'estadoPedido' },
      { model: Delivery, as: 'delivery' },
      { model: GuiaDespacho, as: 'documentoUsa' },
      { model: ComprobanteVenta, as: 'comprobanteVenta' },
      ],
    });
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los pedidos", error });
  }
};

export const getPedidoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findByPk(id);
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ message: "Pedido no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pedido", error });
  }
};

export const createPedido = async (req: Request, res: Response) => {
  const {
    empleados_id,
    clientes_id,
    estado_pedidos_id,
    deliverys_id,
    monto_total,
    documento_usa_id,
    n_despacho_chile,
    comprobante_ventas_id,
  } = req.body;
  try {
    const nuevoPedido = await Pedido.create({
      empleados_id,
      clientes_id,
      estado_pedidos_id,
      deliverys_id,
      monto_total,
      documento_usa_id,
      n_despacho_chile,
      comprobante_ventas_id,
    });
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el pedido", error });
  }
};

export const updatePedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    empleados_id,
    clientes_id,
    estado_pedidos_id,
    deliverys_id,
    monto_total,
    documento_usa_id,
    n_despacho_chile,
    comprobante_ventas_id,
  } = req.body;
  try {
    const pedido = await Pedido.findByPk(id);
    if (pedido) {
      await pedido.update({
        empleados_id,
        clientes_id,
        estado_pedidos_id,
        deliverys_id,
        monto_total,
        documento_usa_id,
        n_despacho_chile,
        comprobante_ventas_id,
      });
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ message: "Pedido no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el pedido", error });
  }
};

export const deletePedido = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findByPk(id);
    if (pedido) {
      await pedido.destroy();
      res.status(200).json({ message: "Pedido eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Pedido no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el pedido", error });
  }
};

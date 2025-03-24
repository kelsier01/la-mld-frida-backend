import { NextFunction, Request, Response } from "express";
import Pedido from "../models/Pedido";
import Cliente from "../models/Cliente";
import ComprobanteVenta from "../models/ComprobanteVenta";
import Delivery from "../models/Delivery";
import Empleado from "../models/Empleado";
import EstadoPedido from "../models/EstadoPedido";
import GuiaDespacho from "../models/GuiaDespacho";
import Persona from "../models/Persona";
import { Op } from "sequelize";
import Direccion from "../models/Direccion";
import Region from "../models/Region";

// export const getAllPedidos = async (req: Request, res: Response) => {
//   try {
//     const pedidos = await Pedido.findAll({
//       include: [
//         {
//           model: Empleado,
//         },
//         {
//           model: Cliente,

//           include: [
//             {
//               model: Persona,
//             },
//           ],
//         },
//         { model: EstadoPedido },
//         {
//           model: Delivery,
//         },
//         {
//           model: GuiaDespacho,
//         },
//         {
//           model: ComprobanteVenta,
//         },
//       ],
//     });
//     res.status(200).json(pedidos);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener los pedidos", error });
//   }
// };

export const getAllPedidos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      search = "",
      page = "1",
      limit = 10,
      fecha_desde,
      fecha_hasta,
      estadoId,
      clienteId,
      regionId,
    } = req.query as {
      search?: string;
      page?: Number;
      limit?: Number;
      fecha_desde?: string;
      fecha_hasta?: string;
      estadoId?: Number;
      clienteId?: Number;
      regionId?: Number;
    };

    const pageNumber = Number(page);
    const limite = Number(limit);
    const desde = fecha_desde || "";
    const hasta = fecha_hasta || "";
    const estado = estadoId != 0 ? estadoId : "";
    const cliente = clienteId != 0 ? clienteId : "";
    const region = regionId != 0 ? regionId : "";

    console.log(
      `search = ${search}
       - desde = ${desde} - 
       hasta = ${hasta} - 
       estado = ${estado} - 
       cliente = ${cliente} - 
       region = ${region}`
    );

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res
        .status(400)
        .json({ error: "El parámetro 'page' debe ser un número positivo." });
    }

    const offset = (pageNumber - 1) * limite;

    // Construcción de la condición de búsqueda en Pedido
    const pedidoWhere: any = {
      ...(search &&
        search.trim() && { codigo: { [Op.like]: `%${search.trim()}%` } }),
      ...(estado && { estado_pedidos_id: estado }),
      ...(cliente && { cliente_id: cliente }),
      ...(desde && { createdAt: { [Op.gte]: desde } }),
      ...(hasta && { createdAt: { [Op.lte]: hasta } }),
    };

    const regionWhere: any = {
      ...(region && { region_id: region }),
    };

    const { rows: pedidos, count: total } = await Pedido.findAndCountAll({
      where: pedidoWhere,
      include: [
        { model: Empleado },
        { model: Cliente, include: [{ model: Persona }] },
        { model: EstadoPedido },
        { model: Delivery },
        { model: GuiaDespacho },
        { model: ComprobanteVenta },
        {
          model: Direccion,
          where: regionWhere,
          include: [{ model: Region }],
        },
      ],
      limit: limite,
      offset,
      distinct: true,
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      pedidos,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / limite),
    });
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
    direccion_id,
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
      direccion_id,
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
    guia_despacho_id,
    tracking_number,
    comprobante_ventas_id,
    direccion_id,
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
        guia_despacho_id,
        tracking_number,
        comprobante_ventas_id,
        direccion_id,
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

export const getPedidosByGuiaDespachoId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findAll({
      where: {
        guia_despacho_id: id,
      },
    });
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ message: "Pedido no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pedido", error });
  }
};

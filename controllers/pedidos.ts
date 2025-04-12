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
import Comuna from "../models/Comuna";
import { log } from "console";

export const getAllPedidos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      page = "1",
      search = "",
      searchCliente = "",
      fecha_desde,
      fecha_hasta,
      estadoId,
      regionId,
      limit = "10",
    } = req.query as Record<string, string>;

    const desde = fecha_desde || "";
    const hasta = fecha_hasta || "";
    const estado = estadoId ? Number(estadoId) : undefined;
    const region = regionId ? Number(regionId) : undefined;
    const pageNumber = Math.max(1, parseInt(page, 10));
    const limite = Math.max(1, parseInt(limit, 10));
    const offset = (pageNumber - 1) * limite;

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res
        .status(400)
        .json({ error: "El parámetro 'page' debe ser un número positivo." });
    }

    console.log(
      `search = ${search}
       - desde = ${desde} - 
       hasta = ${hasta} - 
       estado = ${estado} - 
       cliente = ${searchCliente} - 
       region = ${region}`
    );

    // 2. Construir filtro de Pedido (ID, fechas, estado)
    const pedidoWhere: any = {
      ...(search.trim() && {
        id: { [Op.like]: `%${search.trim()}%` },
      }),
      ...(fecha_desde &&
        !fecha_hasta && {
          createdAt: { [Op.between]: [new Date(fecha_desde), new Date()] },
        }),
      ...(fecha_desde &&
        fecha_hasta && {
          createdAt: {
            [Op.between]: [new Date(fecha_desde), new Date(fecha_hasta)],
          },
        }),
      ...(estadoId &&
        Number(estadoId) !== 0 && {
          estado_pedidos_id: Number(estadoId),
        }),
    };

    // 3. Preparar include de Cliente → Persona, con filtro condicional
    const clienteInclude: any = {
      model: Cliente,
      ...(searchCliente.trim() && { required: true }),
      include: [
        {
          model: Persona,
          ...(searchCliente.trim() && {
            where: {
              nombre: { [Op.like]: `%${searchCliente.trim()}%` },
            },
          }),
        },
      ],
    };

    // 4. Preparar include de Dirección → Región, con filtro condicional
    const direccionInclude: any = {
      model: Direccion,
      include: [
        {
          model: Region,
          ...(regionId &&
            Number(regionId) !== 0 && {
              where: { id: Number(regionId) },
              required: true,
            }),
        },
      ],
    };

    // 5. Ejecutar la consulta con todos los includes
    const { rows: pedidos, count: total } = await Pedido.findAndCountAll({
      where: pedidoWhere,
      include: [
        { model: Empleado },
        clienteInclude,
        { model: EstadoPedido },
        { model: Delivery },
        { model: GuiaDespacho },
        { model: ComprobanteVenta },
        direccionInclude,
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
    console.log("Error al obtener los pedidos", error);
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
  console.log("createPedido", req.body);
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
    console.log("Error al crear el pedido", error);

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

export const getPedidosByGuiaDespachoId = async (
  req: Request,
  res: Response
) => {
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

export const getPedidosByComprobanteVentaId = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findAll({
      where: {
        comprobante_ventas_id: id,
      },
      include: [
        { model: Empleado },
        { model: Cliente, include: [{ model: Persona }] },
        { model: EstadoPedido },
        { model: Delivery },
        { model: GuiaDespacho },
        { model: ComprobanteVenta },
        {
          model: Direccion,
          include: [{ model: Region }, { model: Comuna }],
        },
      ],
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

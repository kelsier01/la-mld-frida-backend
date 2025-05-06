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
import Pago from "../models/Pago";
import Abono from "../models/Abono";
import LogEstadoPedido from "../models/LogEstadoPedido";
import DetallePedido from "../models/DetallePedido";
import Producto from "../models/Producto";

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

    const region = regionId ? Number(regionId) : undefined;
    const pageNumber = Math.max(1, parseInt(page, 10));
    const limite = Math.max(1, parseInt(limit, 10));
    const offset = (pageNumber - 1) * limite;

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res
        .status(400)
        .json({ error: "El parámetro 'page' debe ser un número positivo." });
    }

    let validRegion = region == 0 ? false : true;

    // 2. Construir filtro de Pedido (ID, fechas, estado)
    const pedidoWhere: any = {
      eliminado: 0,
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
      required: validRegion,
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
    bodega_destino_id,
    fecha_entrega,
    eliminado,
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
      bodega_destino_id,
      fecha_entrega,
      eliminado,
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
    bodega_destino_id,
    fecha_entrega,
    eliminado,
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
        bodega_destino_id,
        fecha_entrega,
        eliminado,
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
        eliminado: 0,
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
        eliminado: 0,
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

export const getPedidosBySaldoCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pedido = await Pedido.findAll({
      where: {
        clientes_id: id,
        eliminado: 0,
      },
      include: [
        { model: DetallePedido, include: [{ model: Producto }] },
        { model: Pago, include: [{ model: Abono }] },
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

// Constantes para estados de pedidos
const ESTADOS_PEDIDO = {
  RECEPCIONADO_CHILE: 3,
  LISTO_DESPACHAR: 4,
} as const;

export const getPedidosByFechaEntrega = async () => {
  try {
    // Obtener la fecha de hoy
    const hoy = new Date();
    // Formatear la fecha para obtener solo YYYY-MM-DD
    const fechaHoy = hoy.toISOString().split("T")[0];

    const pedidos = await Pedido.findAll({
      where: {
        eliminado: 0,
        fecha_entrega: {
          [Op.between]: [`${fechaHoy} 00:00:00`, `${fechaHoy} 23:59:59`],
        },
      },
      attributes: ["id", "fecha_entrega", "estado_pedidos_id"],
    });

    return pedidos;
  } catch (error) {
    console.error("[getPedidosByFechaEntrega] Error:", error);
    throw error; // Propagar el error para mejor manejo
  }
};

export const actualizarEstadoPedido = async (
  id_pedido: number
): Promise<boolean> => {
  try {
    const pedido = await Pedido.findByPk(id_pedido);

    if (!pedido) {
      console.error(
        `[actualizarEstadoPedido] Pedido ${id_pedido} no encontrado`
      );
      return false;
    }

    await pedido.update({
      estado_pedidos_id: ESTADOS_PEDIDO.LISTO_DESPACHAR,
    });

    await LogEstadoPedido.create({
      pedidos_id: id_pedido,
      estado_pedidos_id: ESTADOS_PEDIDO.LISTO_DESPACHAR,
      empleados_id: 5, // EMPLEADO SISTEMA
    });

    console.log(
      `[actualizarEstadoPedido] Pedido ${id_pedido} actualizado exitosamente`
    );
    return true;
  } catch (error) {
    console.error(
      `[actualizarEstadoPedido] Error al actualizar pedido ${id_pedido}:`,
      error
    );
    throw error;
  }
};

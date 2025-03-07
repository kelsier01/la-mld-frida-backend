import { Request, Response } from "express";
import Abono from "../models/Abono";
import Pago from "../models/Pago";

export const getAllAbonos = async (req: Request, res: Response) => {
  try {
    const abonos = await Abono.findAll();
    res.status(200).json(abonos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los abonos", error });
  }
};

export const getAllAbonosByPedidoId = async (req: Request, res: Response) => {
  const { pedidoId } = req.params;
  try {
    const abonos = await Abono.findAll({
      include: [
        {
          model: Pago,
          where: { pedidos_id: pedidoId },
        },
      ],
    });
    res.status(200).json(abonos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los abonos", error });
  }
}

export const getAbonoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const abono = await Abono.findByPk(id);
    if (abono) {
      res.status(200).json(abono);
    } else {
      res.status(404).json({ message: "Abono no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el abono", error });
  }
};

export const createAbono = async (req: Request, res: Response) => {
  const { pagos_id, monto, metodos_pago_id, empleados_id } = req.body;
  try {
    const nuevoAbono = await Abono.create({
      pagos_id,
      monto,
      metodos_pago_id,
      empleados_id,
    });
    res.status(201).json(nuevoAbono);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el abono", error });
  }
};

export const updateAbono = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { pagos_id, monto, fecha, metodos_pago_id, empleados_id } = req.body;
  try {
    const abono = await Abono.findByPk(id);
    if (abono) {
      await abono.update({
        pagos_id,
        monto,
        fecha,
        metodos_pago_id,
        empleados_id,
      });
      res.status(200).json(abono);
    } else {
      res.status(404).json({ message: "Abono no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el abono", error });
  }
};

export const deleteAbono = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const abono = await Abono.findByPk(id);
    if (abono) {
      await abono.destroy();
      res.status(200).json({ message: "Abono eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Abono no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el abono", error });
  }
};

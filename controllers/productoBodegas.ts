import { Request, Response } from "express";
import ProductoBodega from "../models/ProductoBodega";
import Bodega from "../models/Bodega";

export const getAllProductoBodegas = async (req: Request, res: Response) => {
  try {
    const productoBodegas = await ProductoBodega.findAll();
    res.status(200).json(productoBodegas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los productos en bodega", error });
  }
};

export const getProductoBodegaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoBodega = await ProductoBodega.findByPk(id);
    if (productoBodega) {
      res.status(200).json(productoBodega);
    } else {
      res.status(404).json({ message: "Producto en bodega no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener el producto en bodega", error });
  }
};

export const createProductoBodega = async (req: Request, res: Response) => {
  const { productos_id, bodegas_id, stock } = req.body;
  try {
    const nuevoProductoBodega = await ProductoBodega.create({
      productos_id,
      bodegas_id,
      stock,
    });

    const productoBodegaConBodega = await ProductoBodega.findByPk(
      nuevoProductoBodega.id,
      {
        include: [{ model: Bodega }],
      }
    );

    res.status(201).json(productoBodegaConBodega);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el producto en bodega", error });
  }
};

export const updateProductoBodega = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productos_id, bodegas_id, stock } = req.body;
  try {
    const productoBodega = await ProductoBodega.findByPk(id);
    if (productoBodega) {
      await productoBodega.update({
        productos_id,
        bodegas_id,
        stock,
      });
      res.status(200).json(productoBodega);
    } else {
      res.status(404).json({ message: "Producto en bodega no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el producto en bodega", error });
  }
};

export const deleteProductoBodega = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoBodega = await ProductoBodega.findByPk(id);
    if (productoBodega) {
      await productoBodega.destroy();
      res
        .status(200)
        .json({ message: "Producto en bodega eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Producto en bodega no encontrado" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el producto en bodega", error });
  }
};

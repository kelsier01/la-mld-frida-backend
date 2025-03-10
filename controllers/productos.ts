import { NextFunction, Request, Response } from "express";
import Producto from "../models/Producto";
import Categoria from "../models/Categoria";
import Marca from "../models/Marca";
import ProductoBodega from "../models/ProductoBodega";
import ProductoImagen from "../models/ProductoImagen";
import Bodega from "../models/Bodega";
import { Op } from "sequelize";

export const getAllProductos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      search = "",
      page = "1",
      categoriaId,
      marcasId,
      bodegaId,
      limit = 10,
    } = req.query as {
      search?: string;
      page?: Number;
      categoriaId?: Number;
      marcasId?: Number;
      bodegaId?: Number;
      limit?: Number;
    };

    const pageNumber = Number(page);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res
        .status(400)
        .json({ error: "El parámetro 'page' debe ser un número positivo." });
    }
    const offset = (pageNumber - 1) * Number(limit);
    const limite = Number(limit);

    // Construcción de la condición de búsqueda en Persona
    const productoWhere: any = {
      ...(search &&
        search.trim() && { codigo: { [Op.like]: `%${search.trim()}%` } }),
      ...(categoriaId && { categoria_id: categoriaId }),
      ...(marcasId && { marcas_id: marcasId }),
    };

    // Construcción de la condición de búsqueda en Direccion
    const bodegaWhere: any = {
      ...(bodegaId && { bodegas_id: bodegaId }),
    };

    const productos = await Producto.findAll({
      where: productoWhere,
      include: [
        {
          model: Categoria,
        },
        {
          model: Marca,
        },
        { model: ProductoImagen },
        {
          model: ProductoBodega,
          where: bodegaWhere,
          include: [
            {
              model: Bodega,
            },
          ],
        },
      ],
      limit: limite,
      offset,
    });
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

export const getProductoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id, {
      include:[
        {
          model: Categoria,
        },
        {
          model: Marca,
        },
        { model: ProductoImagen,
        },
        { model: ProductoBodega, 
          include: [
            { 
              model: Bodega,
            }
          ],
        },
      ],
    });
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

export const createProducto = async (req: Request, res: Response) => {
  const {
    Categoria_id,
    marcas_id,
    codigo,
    nombre,
    precio_venta,
    Precio_compra_usd,
  } = req.body;
  try {
    const nuevoProducto = await Producto.create({
      Categoria_id,
      marcas_id,
      codigo,
      nombre,
      precio_venta,
      Precio_compra_usd,
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {
    Categoria_id,
    marcas_id,
    codigo,
    nombre,
    precio_venta,
    Precio_compra_usd,
  } = req.body;
  try {
    const producto = await Producto.findByPk(id);
    if (producto) {
      await producto.update({
        Categoria_id,
        marcas_id,
        codigo,
        nombre,
        precio_venta,
        Precio_compra_usd,
      });
      res.status(200).json(producto);
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

export const deleteProducto = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (producto) {
      await producto.destroy();
      res.status(200).json({ message: "Producto eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};

import { Request, Response } from "express";
import Producto from "../models/Producto";
import Categoria from "../models/Categoria";
import Marca from "../models/Marca";
import ProductoBodega from "../models/ProductoBodega";
import ProductoImagen from "../models/ProductoImagen";
import Bodega from "../models/Bodega";


export const getAllProductos = async (req: Request, res: Response) => {
  try {
    const productos = await Producto.findAll({
      include:[
        {
          model: Categoria,
          as: "categoria_producto",
        },
        {
          model: Marca,
          as: "marca_producto",
        },
        { model: ProductoImagen,
          as: "imagenes_producto",
        },
        { model: ProductoBodega, 
          as: "bodegas_producto",
          include: [
            { 
              model: Bodega,
              as: "bodega_producto"
            }
          ],
        },
      ]
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
          as: "categoria_producto",
        },
        {
          model: Marca,
          as: "marca_producto",
        },
        { model: ProductoImagen,
          as: "imagenes_producto",
        },
        { model: ProductoBodega, 
          as: "bodegas_producto",
          include: [
            { 
              model: Bodega,
              as: "bodega_producto"
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

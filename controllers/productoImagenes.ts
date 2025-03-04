import { Request, Response } from "express";
import ProductoImagen from "../models/ProductoImagen";
import fs from "fs";
import path from "path";
import upload from "../middlewares/multer"; // Importa el middleware de Multer

// Obtener todas las imágenes de productos
export const getAllProductoImagenes = async (req: Request, res: Response) => {
  try {
    const productoImagenes = await ProductoImagen.findAll();
    res.status(200).json(productoImagenes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener las imágenes de productos", error });
  }
};

// Obtener una imagen de producto por su ID
export const getProductoImagenById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoImagen = await ProductoImagen.findByPk(id);
    if (productoImagen) {
      res.status(200).json(productoImagen);
    } else {
      res.status(404).json({ message: "Imagen de producto no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener la imagen de producto", error });
  }
};

// Crear una nueva imagen de producto
export const createProductoImagen = async (req: Request, res: Response) => {
  // Usa Multer para manejar la subida de la imagen
  upload.single("imagen")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Error al subir la imagen", error: err });
    }

    const { productos_id, nombre } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No se subió ninguna imagen." });
    }

    // Ruta temporal del archivo subido
    const tempFilePath = req.file.path;

    // Ruta definitiva en la carpeta pública de la API
    const publicPath = path.join(__dirname, "../public/images", req.file.filename);

    // Mueve el archivo a la carpeta pública
    fs.rename(tempFilePath, publicPath, async (err) => {
      if (err) {
        console.error("Error al mover la imagen:", err);
        return res.status(500).json({ message: "Error al guardar la imagen." });
      }

      // URL pública de la imagen
      const imageUrl = `/images/${req.file!.filename}`;

      try {
        // Guarda la URL en la base de datos
        const nuevaProductoImagen = await ProductoImagen.create({
          productos_id,
          nombre,
          url: imageUrl,
        });

        res.status(201).json(nuevaProductoImagen);
      } catch (error) {
        res.status(500).json({ message: "Error al crear la imagen de producto", error });
      }
    });
  });
};

// Actualizar una imagen de producto
export const updateProductoImagen = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { productos_id, nombre, url } = req.body;
  try {
    const productoImagen = await ProductoImagen.findByPk(id);
    if (productoImagen) {
      await productoImagen.update({
        productos_id,
        nombre,
        url,
      });
      res.status(200).json(productoImagen);
    } else {
      res.status(404).json({ message: "Imagen de producto no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar la imagen de producto", error });
  }
};

// Eliminar una imagen de producto
export const deleteProductoImagen = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const productoImagen = await ProductoImagen.findByPk(id);
    if (productoImagen) {
      // Elimina la imagen del sistema de archivos
      const imagePath = path.join(__dirname, "../public/images", productoImagen.url.split("/images/")[1]);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error al eliminar la imagen:", err);
        }
      });

      // Elimina el registro de la base de datos
      await productoImagen.destroy();
      res
        .status(200)
        .json({ message: "Imagen de producto eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Imagen de producto no encontrada" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar la imagen de producto", error });
  }
};
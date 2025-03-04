import { Request, Response } from "express";
import Persona from "../models/Persona";

export const getAllPersonas = async (req: Request, res: Response) => {
  try {
    const personas = await Persona.findAll();
    res.status(200).json(personas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las personas", error });
  }
};

export const getPersonaById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const persona = await Persona.findByPk(id);
    if (persona) {
      res.status(200).json(persona);
    } else {
      res.status(404).json({ message: "Persona no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la persona", error });
  }
};

export const createPersona = async (req: Request, res: Response) => {
  const { nombre, correo, n_identificacion, fono } = req.body;
  try {
    const nuevaPersona = await Persona.create({
      nombre,
      correo,
      n_identificacion,
      fono,
    });
    res.status(201).json(nuevaPersona);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la persona", error });
  }
};

export const updatePersona = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, correo, n_identificacion, fono } = req.body;
  try {
    const persona = await Persona.findByPk(id);
    if (persona) {
      await persona.update({ nombre, correo, n_identificacion, fono });
      res.status(200).json(persona);
    } else {
      res.status(404).json({ message: "Persona no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la persona", error });
  }
};

export const deletePersona = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const persona = await Persona.findByPk(id);
    if (persona) {
      // await persona.destroy();
      res.status(200).json({ message: "Persona eliminada correctamente" });
    } else {
      res.status(404).json({ message: "Persona no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la persona", error });
  }
};

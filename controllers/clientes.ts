import { Request, Response, NextFunction } from "express";
import Cliente from "../models/Cliente";
import Persona from "../models/Persona";
import Direccion from "../models/Direccion";
import { Op } from "sequelize";
import Region from "../models/Region";
import Comuna from "../models/Comuna";
import { log } from "console";

export const getAllClientes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      search = "",
      page = "1",
      region,
      limit = 10,
    } = req.query as {
      search?: string;
      page?: Number;
      region?: Number;
      limit?: Number;
    };

    // Validación de la paginación
    const pageNumber = Number(page);
    let regionNumber = region == 0 ? undefined : Number(region);
    let validRegion = region == 0 ? false : true;
    const offset = (pageNumber - 1) * Number(limit);
    let limite = Number(limit);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return res
        .status(400)
        .json({ error: "El parámetro 'page' debe ser un número positivo." });
    }
    if (search || region) {
      limite = 100;
    }
    // Construcción de la condición de búsqueda en Persona
    const personaWhere: any = search
      ? {
          [Op.or]: [
            { nombre: { [Op.like]: `%${search}%` } },
            { n_identificacion: { [Op.like]: `%${search}%` } },
          ],
        }
      : {};

    // Construcción de la condición de búsqueda en Direccion
    const direccionWhere: any = {
      ...(regionNumber && { region_id: regionNumber }),
    };
    console.log("direccionWhere", direccionWhere);

    // Ejecución de la consulta con Sequelize
    const { rows: clientes, count: total } = await Cliente.findAndCountAll({
      include: [
        {
          model: Persona,
          as: "persona", // Asegurar que coincida con la relación definida en Sequelize
          where: personaWhere,
          required: true, // INNER JOIN para que solo traiga clientes con Persona asociada
        },
        {
          model: Direccion,
          as: "Direccions",
          where: direccionWhere,
          required: validRegion, // INNER JOIN para que solo traiga clientes con Persona asociada
          include: [
            { model: Region, required: false },
            { model: Comuna, required: false },
          ],
        },
      ],
      limit: limite,
      offset,
      distinct: true,
    });

    return res.json({
      clientes,
      total,
      page: pageNumber,
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    next(error); // Delegar el error al middleware de manejo de errores
  }
};

export const getClienteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id, {
      include: [
        { model: Persona },
        {
          model: Direccion,
          required: false,
          include: [
            { model: Region, required: true },
            { model: Comuna, required: true },
          ],
        },
      ],
    });
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el cliente", error });
  }
};

export const createCliente = async (req: Request, res: Response) => {
  const {
    n_identificacion,
    nombre,
    correo,
    fono,
    direccion,
    cta_instagram,
    region_id,
    comuna_id,
  } = req.body;

  try {
    // Buscar si la persona ya existe por n_identificacion
    let persona: any = await Persona.findOne({ where: { n_identificacion } });

    if (persona) {
      // Verificar si la persona ya está asociada a un cliente
      const clienteExistente = await Cliente.findOne({
        where: { personas_id: persona.id },
      });

      if (clienteExistente) {
        return res
          .status(400)
          .json({ message: "La persona ya está registrada como cliente" });
      }
      let region: any = await Region.findByPk(region_id);
      let comuna: any = await Comuna.findByPk(comuna_id);
      // Si la persona existe pero no es cliente, crear el cliente con la ID de la persona existente
      const nuevoCliente: any = await Cliente.create({
        personas_id: persona.id,
        cta_instagram,
        eliminado: 0,
      });

      // Crear la dirección del cliente

      // Crear la dirección del cliente
      const nuevaDireccion = await Direccion.create({
        clientes_id: nuevoCliente.id,
        direccion,
        region_id,
        comuna_id,
      });

      return res
        .status(201)
        .json({ nuevoCliente, nuevaDireccion, persona, region, comuna });
    } else {
      // Si la persona no existe, la creamos
      persona = await Persona.create({
        nombre,
        correo,
        n_identificacion,
        fono,
      });
      // Crear el cliente con la persona recién creada
      const nuevoCliente: any = await Cliente.create({
        personas_id: persona.id,
        cta_instagram,
        eliminado: 0,
      });
      // Crear la dirección del cliente
      const nuevaDireccion = await Direccion.create({
        clientes_id: nuevoCliente.id,
        direccion,
        region_id,
        comuna_id,
      });

      res.status(201).json({ nuevoCliente, nuevaDireccion, persona });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al crear el cliente", error });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, n_identificacion, correo, fono, cta_instagram, eliminado } =
    req.body;

  try {
    const cliente: any = await Cliente.findByPk(id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Buscar la persona asociada
    const persona = await Persona.findByPk(cliente.personas_id);
    if (!persona) {
      return res.status(404).json({ message: "Persona no encontrada" });
    }

    // Actualizar los datos de la persona
    await persona.update({ nombre, n_identificacion, correo, fono });

    // Actualizar los datos del cliente
    await cliente.update({ cta_instagram, eliminado });

    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el cliente", error });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      await cliente.update({ eliminado: 1 });
      res.status(200).json({ message: "Cliente eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error });
  }
};

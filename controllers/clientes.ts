import { Request, Response } from "express";
import Cliente from "../models/Cliente";
import Persona from "../models/Persona";
import Direccion from "../models/Direccion";
import { Op } from "sequelize";

// export const getAllClientes = async (req: Request, res: Response) => {
//   try {
//     const clientes = await Cliente.findAll({
//       include: [Persona, Direccion],
//     });
//     res.status(200).json(clientes);
//   } catch (error) {
//     res.status(500).json({ message: "Error al obtener los clientes", error });
//   }
// };

export const getAllClientes = async (req: Request, res: Response) => {
  const { search, page = "1", region } = req.query;
  console.log("search", search);

  // Convertir 'page' a número y establecer un valor predeterminado de 1 si no es válido
  const pageNumber = isNaN(Number(page)) ? 1 : Number(page);

  // Configuración de la paginación
  const limit = 10; // Número de clientes por página
  const offset = (pageNumber - 1) * limit;

  // Construir la condición de búsqueda
  const whereCondition: any = {
    ...(search && {
      [Op.or]: [
        { "Persona.nombre": { [Op.like]: `%${search}%` } }, // Filtrado por nombre
        { "Persona.n_identificacion": { [Op.like]: `%${search}%` } }, // Filtrado por n_identificacion
      ],
    }),
    //...(region && { "Direcciones.region": region }), 
    // Filtrado por región si se proporciona
  };
  console.log("where", whereCondition);

  try {
    const { rows, count } = await Cliente.findAndCountAll({
      where: whereCondition,
      include: [{ model: Persona }, { model: Direccion }],
      limit,
      offset,
    });

    console.log("rows", rows);

    res.json({
      clientes: rows,
      total: count,
      page: pageNumber,
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).send("Error al obtener clientes");
  }
};

export const getClienteById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id, {
      include: [Persona, Direccion],
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
  const { n_identificacion, nombre, correo, fono, direccion, cta_instagram } =
    req.body;

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

      // Si la persona existe pero no es cliente, crear el cliente con la ID de la persona existente
      const nuevoCliente = await Cliente.create({
        personas_id: persona.id,
        cta_instagram,
      });

      return res.status(201).json(nuevoCliente);
    }

    // Si la persona no existe, la creamos
    persona = await Persona.create({
      n_identificacion,
      nombre,
      correo,
      fono,
    });

    // Crear el cliente con la persona recién creada
    const nuevoCliente = await Cliente.create({
      personas_id: persona.id,
      cta_instagram,
    });

    res.status(201).json(nuevoCliente);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el cliente", error });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, n_identificacion, correo, fono, cta_instagram } = req.body;

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
    await cliente.update({ cta_instagram });

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
      await cliente.update({ eliminado: true });
      res.status(200).json({ message: "Cliente eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Cliente no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el cliente", error });
  }
};

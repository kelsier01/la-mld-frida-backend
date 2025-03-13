import express, { Application } from "express";
import path from "path";

// Conexiones BD
import db from "../BD/connection";
import authRoutes from "../rutas/auth";
// Rutas existentes
import userRoutes from "../rutas/usuario";
import personaRoutes from "../rutas/persona";
import clienteRoutes from "../rutas/cliente";
import estadoRoutes from "../rutas/estado";
import rolRoutes from "../rutas/rol";
// Nuevas rutas
import empleadoRoutes from "../rutas/empleado";
import estadoPedidoRoutes from "../rutas/estadoPedido";
import deliveryRoutes from "../rutas/delivery";
import guiaDespachoRoutes from "../rutas/guiaDespacho";
import comprobanteVentaRoutes from "../rutas/comprobanteVenta";
import pedidoRoutes from "../rutas/pedido";
import metodoPagoRoutes from "../rutas/metodoPago";
import pagoRoutes from "../rutas/pago";
import abonoRoutes from "../rutas/abono";
import bodegaRoutes from "../rutas/bodega";
import categoriaRoutes from "../rutas/categoria";
import marcaRoutes from "../rutas/marca";
import productoRoutes from "../rutas/producto";
import detallePedidoRoutes from "../rutas/detallePedido";
import direccionRoutes from "../rutas/direccion";
import productoBodegaRoutes from "../rutas/productoBodega";
import logEstadoPedidoRoutes from "../rutas/logEstadoPedido";
import productoImagenRoutes from "../rutas/productoImagen";
import regionRoutes from "../rutas/region";
import comunaRoutes from "../rutas/comuna";

import dotenv from "dotenv";
import { syncModels } from "./index";
import cors from "cors";

dotenv.config();

class Server {
  private app: Application;
  private port: string;
  private apiPath = {
    auth: "/api/auth",
    // Rutas existentes
    users: "/api/usuario",
    persona: "/api/persona",
    cliente: "/api/cliente",
    estado: "/api/estado",
    rol: "/api/rol",

    // Nuevas rutas
    empleado: "/api/empleado",
    estadoPedido: "/api/estadoPedido",
    delivery: "/api/delivery",
    guiaDespacho: "/api/guiaDespacho",
    comprobanteVenta: "/api/comprobanteVenta",
    pedido: "/api/pedido",
    metodoPago: "/api/metodoPago",
    pago: "/api/pago",
    abono: "/api/abono",
    bodega: "/api/bodega",
    categoria: "/api/categoria",
    marca: "/api/marca",
    producto: "/api/producto",
    detallePedido: "/api/detallePedido",
    direccion: "/api/direccion",
    productoBodega: "/api/productoBodega",
    logEstadoPedido: "/api/logEstadoPedido",
    productoImagen: "/api/productoImagen",
    region: "/api/region",
    comuna: "/api/comuna",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8000";
    this.bdConnection();
    this.middlewares();
    this.routes();
  }

  async bdConnection() {
    try {
      await db.authenticate();
      console.log("Database Online");
      await syncModels();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json()); // Lectura y parseo del body
    this.app.use("/images", express.static(path.join(__dirname, "../public/images")));
  }

  routes() {
    // Rutas existentes
    this.app.use(this.apiPath.auth, authRoutes);
    this.app.use(this.apiPath.users, userRoutes);
    this.app.use(this.apiPath.persona, personaRoutes);
    this.app.use(this.apiPath.cliente, clienteRoutes);
    this.app.use(this.apiPath.estado, estadoRoutes);
    this.app.use(this.apiPath.rol, rolRoutes);

    // Nuevas rutas
    this.app.use(this.apiPath.empleado, empleadoRoutes);
    this.app.use(this.apiPath.estadoPedido, estadoPedidoRoutes);
    this.app.use(this.apiPath.delivery, deliveryRoutes);
    this.app.use(this.apiPath.guiaDespacho, guiaDespachoRoutes);
    this.app.use(this.apiPath.comprobanteVenta, comprobanteVentaRoutes);
    this.app.use(this.apiPath.pedido, pedidoRoutes);
    this.app.use(this.apiPath.metodoPago, metodoPagoRoutes);
    this.app.use(this.apiPath.pago, pagoRoutes);
    this.app.use(this.apiPath.abono, abonoRoutes);
    this.app.use(this.apiPath.bodega, bodegaRoutes);
    this.app.use(this.apiPath.categoria, categoriaRoutes);
    this.app.use(this.apiPath.marca, marcaRoutes);
    this.app.use(this.apiPath.producto, productoRoutes);
    this.app.use(this.apiPath.detallePedido, detallePedidoRoutes);
    this.app.use(this.apiPath.direccion, direccionRoutes);
    this.app.use(this.apiPath.productoBodega, productoBodegaRoutes);
    this.app.use(this.apiPath.logEstadoPedido, logEstadoPedidoRoutes);
    this.app.use(this.apiPath.productoImagen, productoImagenRoutes);
    this.app.use(this.apiPath.region, regionRoutes);
    this.app.use(this.apiPath.comuna, comunaRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor Conectado al puerto = " + this.port);
    });
  }
}

export default Server;

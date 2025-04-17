import db from "../BD/connection";
import Usuario from "./Usuario";
import Rol from "./Rol";
import Persona from "./Persona";
import Cliente from "./Cliente";
import Empleado from "./Empleado";
import EstadoPedido from "./EstadoPedido";
import Estado from "./Estado";
import Delivery from "./Delivery";
import GuiaDespacho from "./GuiaDespacho";
import ComprobanteVenta from "./ComprobanteVenta";
import Pedido from "./Pedido";
import MetodoPago from "./MetodoPago";
import Pago from "./Pago";
import Abono from "./Abono";
import Bodega from "./Bodega";
import Categoria from "./Categoria";
import Marca from "./Marca";
import Producto from "./Producto";
import DetallePedido from "./DetallePedido";
import Direccion from "./Direccion";
import ProductoBodega from "./ProductoBodega";
import LogEstadoPedido from "./LogEstadoPedido";
import ProductoImagen from "./ProductoImagen";
import Region from "./Region";
import Comuna from "./Comuna";

// Establecer las asociaciones
// Usuario - Rol
Usuario.belongsTo(Rol, { foreignKey: "roles_id" });
Rol.hasMany(Usuario, { foreignKey: "roles_id" });

// Cliente - Persona
Cliente.belongsTo(Persona, { foreignKey: "personas_id" });
Persona.hasMany(Cliente, { foreignKey: "personas_id" });

// Empleado - Persona
Empleado.belongsTo(Persona, { foreignKey: "personas_id" });
Persona.hasMany(Empleado, { foreignKey: "personas_id" });

// Empleado - Usuario
Empleado.belongsTo(Usuario, { foreignKey: "usuarios_id" });
Usuario.hasMany(Empleado, { foreignKey: "usuarios_id" });

// Pedido - Empleado
Pedido.belongsTo(Empleado, { foreignKey: "empleados_id" });
Empleado.hasMany(Pedido, { foreignKey: "empleados_id" });

// Pedido - Cliente
Pedido.belongsTo(Cliente, { foreignKey: "clientes_id" });
Cliente.hasMany(Pedido, { foreignKey: "clientes_id" });

// Pedido - EstadoPedido
Pedido.belongsTo(EstadoPedido, { foreignKey: "estado_pedidos_id" });
EstadoPedido.hasMany(Pedido, { foreignKey: "estado_pedidos_id" });

// Pedido - Delivery
Pedido.belongsTo(Delivery, { foreignKey: "deliverys_id" });
Delivery.hasMany(Pedido, { foreignKey: "deliverys_id" });

// Pedido - GuiaDespacho
Pedido.belongsTo(GuiaDespacho, { foreignKey: "guia_despacho_id" });
GuiaDespacho.hasMany(Pedido, { foreignKey: "guia_despacho_id" });

// Pedido - ComprobanteVenta
Pedido.belongsTo(ComprobanteVenta, { foreignKey: "comprobante_ventas_id" });
ComprobanteVenta.hasMany(Pedido, { foreignKey: "comprobante_ventas_id" });

Pedido.belongsTo(Direccion, { foreignKey: "direccion_id" });
Direccion.hasMany(Pedido, { foreignKey: "direccion_id" });

// Pago - Pedido
Pago.belongsTo(Pedido, { foreignKey: "pedidos_id" });
Pedido.hasMany(Pago, { foreignKey: "pedidos_id" });

// Pago - MetodoPago
Pago.belongsTo(MetodoPago, { foreignKey: "metodos_pago_id" });
MetodoPago.hasMany(Pago, { foreignKey: "metodos_pago_id" });

// Abono - Pago
Abono.belongsTo(Pago, { foreignKey: "pagos_id" });
Pago.hasMany(Abono, { foreignKey: "pagos_id" });

// Abono - MetodoPago
Abono.belongsTo(MetodoPago, { foreignKey: "metodos_pago_id" });
MetodoPago.hasMany(Abono, { foreignKey: "metodos_pago_id" });

// Abono - Empleado
Abono.belongsTo(Empleado, { foreignKey: "empleados_id" });
Empleado.hasMany(Abono, { foreignKey: "empleados_id" });

// Producto - Categoria
Producto.belongsTo(Categoria, { foreignKey: "Categoria_id" });
Categoria.hasMany(Producto, { foreignKey: "Categoria_id" });

// Producto - Marca
Producto.belongsTo(Marca, { foreignKey: "marcas_id" });
Marca.hasMany(Producto, { foreignKey: "marcas_id" });

// DetallePedido - Pedido
DetallePedido.belongsTo(Pedido, { foreignKey: "pedidos_id" });
Pedido.hasMany(DetallePedido, { foreignKey: "pedidos_id" });

// DetallePedido - Producto
DetallePedido.belongsTo(Producto, { foreignKey: "productos_id" });
Producto.hasMany(DetallePedido, { foreignKey: "productos_id" });

// DetallePedido - Bodega
DetallePedido.belongsTo(Bodega, { foreignKey: "bodegas_id" });
Bodega.hasMany(DetallePedido, { foreignKey: "bodegas_id" });

// Direccion - Cliente
Direccion.belongsTo(Cliente, { foreignKey: "clientes_id" });
Cliente.hasMany(Direccion, { foreignKey: "clientes_id" });

// ProductoBodega - Producto
ProductoBodega.belongsTo(Producto, { foreignKey: "productos_id" });
Producto.hasMany(ProductoBodega, { foreignKey: "productos_id" });

//---------------------------------------------------

// ProductoBodega - Bodega
ProductoBodega.belongsTo(Bodega, { foreignKey: "bodegas_id" });
Bodega.hasMany(ProductoBodega, { foreignKey: "bodegas_id" });

// LogEstadoPedido - Pedido
LogEstadoPedido.belongsTo(Pedido, { foreignKey: "pedidos_id" });
Pedido.hasMany(LogEstadoPedido, { foreignKey: "pedidos_id" });

// LogEstadoPedido - EstadoPedido
LogEstadoPedido.belongsTo(EstadoPedido, { foreignKey: "estado_pedidos_id" });
EstadoPedido.hasMany(LogEstadoPedido, { foreignKey: "estado_pedidos_id" });

// LogEstadoPedido - Empleado
LogEstadoPedido.belongsTo(Empleado, { foreignKey: "empleados_id" });
Empleado.hasMany(LogEstadoPedido, { foreignKey: "empleados_id" });

// ProductoImagen - Producto
ProductoImagen.belongsTo(Producto, { foreignKey: "productos_id" });
Producto.hasMany(ProductoImagen, { foreignKey: "productos_id" });

// ==================================================
// Relaciones del modelo Estado
// ==================================================

// Estado - GuiaDespacho
Estado.hasMany(GuiaDespacho, { foreignKey: "estados_id" });
GuiaDespacho.belongsTo(Estado, { foreignKey: "estados_id" });

// Estado - ComprobanteVenta
Estado.hasMany(ComprobanteVenta, { foreignKey: "estados_id" });
ComprobanteVenta.belongsTo(Estado, { foreignKey: "estados_id" });

// Region - Direccion
Region.hasMany(Direccion, { foreignKey: "region_id" });
Direccion.belongsTo(Region, { foreignKey: "region_id" });

// Comuna - Direccion
Comuna.hasMany(Direccion, { foreignKey: "comuna_id" });
Direccion.belongsTo(Comuna, { foreignKey: "comuna_id" });

GuiaDespacho.belongsTo(Bodega, { foreignKey: "bodega_id" });
Bodega.hasMany(GuiaDespacho, { foreignKey: "bodega_id" });

// =================================================

export const syncModels = async () => {
  try {
    await db.sync({ alter: true });
    // await db.sync({ alter: false, force: false });
    console.log("Modelos sincronizados correctamente");
  } catch (error) {
    console.error("Error al sincronizar los modelos:", error);
  }
};

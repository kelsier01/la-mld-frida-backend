import db from "../BD/connection";
import Usuario from "./Usuario";
import Rol from "./Rol";
import Persona from "./Persona";
import Cliente from "./Cliente";
import Empleado from "./Empleado";
import EstadoPedido from "./EstadoPedido";
import Delivery from "./Delivery";
import Estado from "./Estado"; // Importar el modelo Estado
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
Cliente.belongsTo(Persona, { foreignKey: "personas_id",  as: "persona"});
Persona.hasMany(Cliente, { foreignKey: "personas_id" });

// Empleado - Persona
Empleado.belongsTo(Persona, { foreignKey: "personas_id" });
Persona.hasMany(Empleado, { foreignKey: "personas_id" });

// Empleado - Usuario
Empleado.belongsTo(Usuario, { foreignKey: "usuarios_id" });
Usuario.hasMany(Empleado, { foreignKey: "usuarios_id" });

// Pedido - Empleado
Pedido.belongsTo(Empleado, { foreignKey: "empleados_id", as: 'empleado' });
Empleado.hasMany(Pedido, { foreignKey: "empleados_id", as: 'pedidos'});

// Pedido - Cliente
Pedido.belongsTo(Cliente, { foreignKey: "clientes_id", as: 'cliente' });
Cliente.hasMany(Pedido, { foreignKey: "clientes_id", as: 'pedidos'});

// Pedido - EstadoPedido
Pedido.belongsTo(EstadoPedido, { foreignKey: "estado_pedidos_id", as: 'estadoPedido' });
EstadoPedido.hasMany(Pedido, { foreignKey: "estado_pedidos_id", as: 'pedidos'});

// Pedido - Delivery
Pedido.belongsTo(Delivery, { foreignKey: "deliverys_id", as: 'delivery' });
Delivery.hasMany(Pedido, { foreignKey: "deliverys_id", as: 'pedidos'});

// Pedido - GuiaDespacho
Pedido.belongsTo(GuiaDespacho, { foreignKey: "guia_despacho_id", as: 'guiaDespacho' });
GuiaDespacho.hasMany(Pedido, { foreignKey: "guia_despacho_id", as: 'pedidos'});

// Pedido - ComprobanteVenta
Pedido.belongsTo(ComprobanteVenta, { foreignKey: "comprobante_ventas_id", as: 'comprobanteVenta' });
ComprobanteVenta.hasMany(Pedido, { foreignKey: "comprobante_ventas_id", as: 'pedidos'});

Pedido.belongsTo(Direccion, { foreignKey: "direccion_id", as: 'direccion' });
Direccion.hasMany(Pedido, { foreignKey: "direccion_id", as: 'pedidos'});

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
Producto.belongsTo(Categoria, { foreignKey: "Categoria_id", as: "categoria" });
Categoria.hasMany(Producto, { foreignKey: "Categoria_id", as: "productos" });

// Producto - Marca
Producto.belongsTo(Marca, { foreignKey: "marcas_id", as: "marca" });
Marca.hasMany(Producto, { foreignKey: "marcas_id", as: "productos" });

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

// ProductoBodega - Bodega
ProductoBodega.belongsTo(Bodega, { foreignKey: "bodegas_id", as: "bodega" });
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
ProductoImagen.belongsTo(Producto, { foreignKey: "productos_id", as: "producto" });
Producto.hasMany(ProductoImagen, { foreignKey: "productos_id", as: "imagenes" });

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

// =================================================

export const syncModels = async () => {
  try {
    await db.sync({ alter: true });
    console.log("Modelos sincronizados correctamente");
  } catch (error) {
    console.error("Error al sincronizar los modelos:", error);
  }
};

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncModels = void 0;
const connection_1 = __importDefault(require("../BD/connection"));
const Usuario_1 = __importDefault(require("./Usuario"));
const Rol_1 = __importDefault(require("./Rol"));
const Persona_1 = __importDefault(require("./Persona"));
const Cliente_1 = __importDefault(require("./Cliente"));
const Empleado_1 = __importDefault(require("./Empleado"));
const EstadoPedido_1 = __importDefault(require("./EstadoPedido"));
const Delivery_1 = __importDefault(require("./Delivery"));
const Estado_1 = __importDefault(require("./Estado")); // Importar el modelo Estado
const GuiaDespacho_1 = __importDefault(require("./GuiaDespacho"));
const ComprobanteVenta_1 = __importDefault(require("./ComprobanteVenta"));
const Pedido_1 = __importDefault(require("./Pedido"));
const MetodoPago_1 = __importDefault(require("./MetodoPago"));
const Pago_1 = __importDefault(require("./Pago"));
const Abono_1 = __importDefault(require("./Abono"));
const Bodega_1 = __importDefault(require("./Bodega"));
const Categoria_1 = __importDefault(require("./Categoria"));
const Marca_1 = __importDefault(require("./Marca"));
const Producto_1 = __importDefault(require("./Producto"));
const DetallePedido_1 = __importDefault(require("./DetallePedido"));
const Direccion_1 = __importDefault(require("./Direccion"));
const ProductoBodega_1 = __importDefault(require("./ProductoBodega"));
const LogEstadoPedido_1 = __importDefault(require("./LogEstadoPedido"));
const ProductoImagen_1 = __importDefault(require("./ProductoImagen"));
const Region_1 = __importDefault(require("./Region"));
const Comuna_1 = __importDefault(require("./Comuna"));
// Establecer las asociaciones
// Usuario - Rol
Usuario_1.default.belongsTo(Rol_1.default, { foreignKey: "roles_id" });
Rol_1.default.hasMany(Usuario_1.default, { foreignKey: "roles_id" });
// Cliente - Persona
Cliente_1.default.belongsTo(Persona_1.default, { foreignKey: "personas_id", as: "persona" });
Persona_1.default.hasMany(Cliente_1.default, { foreignKey: "personas_id" });
// Empleado - Persona
Empleado_1.default.belongsTo(Persona_1.default, { foreignKey: "personas_id" });
Persona_1.default.hasMany(Empleado_1.default, { foreignKey: "personas_id" });
// Empleado - Usuario
Empleado_1.default.belongsTo(Usuario_1.default, { foreignKey: "usuarios_id" });
Usuario_1.default.hasMany(Empleado_1.default, { foreignKey: "usuarios_id" });
// Pedido - Empleado
Pedido_1.default.belongsTo(Empleado_1.default, { foreignKey: "empleados_id", as: 'empleado' });
Empleado_1.default.hasMany(Pedido_1.default, { foreignKey: "empleados_id", as: 'pedidos' });
// Pedido - Cliente
Pedido_1.default.belongsTo(Cliente_1.default, { foreignKey: "clientes_id", as: 'cliente' });
Cliente_1.default.hasMany(Pedido_1.default, { foreignKey: "clientes_id", as: 'pedidos' });
// Pedido - EstadoPedido
Pedido_1.default.belongsTo(EstadoPedido_1.default, { foreignKey: "estado_pedidos_id", as: 'estadoPedido' });
EstadoPedido_1.default.hasMany(Pedido_1.default, { foreignKey: "estado_pedidos_id", as: 'pedidos' });
// Pedido - Delivery
Pedido_1.default.belongsTo(Delivery_1.default, { foreignKey: "deliverys_id", as: 'delivery' });
Delivery_1.default.hasMany(Pedido_1.default, { foreignKey: "deliverys_id", as: 'pedidos' });
// Pedido - GuiaDespacho
Pedido_1.default.belongsTo(GuiaDespacho_1.default, { foreignKey: "guia_despacho_id", as: 'guiaDespacho' });
GuiaDespacho_1.default.hasMany(Pedido_1.default, { foreignKey: "guia_despacho_id", as: 'pedidos' });
// Pedido - ComprobanteVenta
Pedido_1.default.belongsTo(ComprobanteVenta_1.default, { foreignKey: "comprobante_ventas_id", as: 'comprobanteVenta' });
ComprobanteVenta_1.default.hasMany(Pedido_1.default, { foreignKey: "comprobante_ventas_id", as: 'pedidos' });
Pedido_1.default.belongsTo(Direccion_1.default, { foreignKey: "direccion_id", as: 'direccion' });
Direccion_1.default.hasMany(Pedido_1.default, { foreignKey: "direccion_id", as: 'pedidos' });
// Pago - Pedido
Pago_1.default.belongsTo(Pedido_1.default, { foreignKey: "pedidos_id" });
Pedido_1.default.hasMany(Pago_1.default, { foreignKey: "pedidos_id" });
// Pago - MetodoPago
Pago_1.default.belongsTo(MetodoPago_1.default, { foreignKey: "metodos_pago_id" });
MetodoPago_1.default.hasMany(Pago_1.default, { foreignKey: "metodos_pago_id" });
// Abono - Pago
Abono_1.default.belongsTo(Pago_1.default, { foreignKey: "pagos_id" });
Pago_1.default.hasMany(Abono_1.default, { foreignKey: "pagos_id" });
// Abono - MetodoPago
Abono_1.default.belongsTo(MetodoPago_1.default, { foreignKey: "metodos_pago_id" });
MetodoPago_1.default.hasMany(Abono_1.default, { foreignKey: "metodos_pago_id" });
// Abono - Empleado
Abono_1.default.belongsTo(Empleado_1.default, { foreignKey: "empleados_id" });
Empleado_1.default.hasMany(Abono_1.default, { foreignKey: "empleados_id" });
// PRODUCTOS
// Producto - Categoria
Producto_1.default.belongsTo(Categoria_1.default, { foreignKey: "Categoria_id", as: "categoria_producto" });
Categoria_1.default.hasMany(Producto_1.default, { foreignKey: "Categoria_id", as: "productos" });
// Producto - Marca
Producto_1.default.belongsTo(Marca_1.default, { foreignKey: "marcas_id", as: "marca_producto" });
Marca_1.default.hasMany(Producto_1.default, { foreignKey: "marcas_id", as: "productos" });
// DetallePedido - Pedido
DetallePedido_1.default.belongsTo(Pedido_1.default, { foreignKey: "pedidos_id" });
Pedido_1.default.hasMany(DetallePedido_1.default, { foreignKey: "pedidos_id" });
// DetallePedido - Producto
DetallePedido_1.default.belongsTo(Producto_1.default, { foreignKey: "productos_id" });
Producto_1.default.hasMany(DetallePedido_1.default, { foreignKey: "productos_id" });
// DetallePedido - Bodega
DetallePedido_1.default.belongsTo(Bodega_1.default, { foreignKey: "bodegas_id" });
Bodega_1.default.hasMany(DetallePedido_1.default, { foreignKey: "bodegas_id" });
// Direccion - Cliente
Direccion_1.default.belongsTo(Cliente_1.default, { foreignKey: "clientes_id" });
Cliente_1.default.hasMany(Direccion_1.default, { foreignKey: "clientes_id" });
// ProductoBodega - Producto
ProductoBodega_1.default.belongsTo(Producto_1.default, { foreignKey: "productos_id" });
Producto_1.default.hasMany(ProductoBodega_1.default, { foreignKey: "productos_id", as: "bodegas_producto" });
//---------------------------------------------------
// ProductoBodega - Bodega
ProductoBodega_1.default.belongsTo(Bodega_1.default, { foreignKey: "bodegas_id", as: "bodega_producto" });
Bodega_1.default.hasMany(ProductoBodega_1.default, { foreignKey: "bodegas_id" });
// LogEstadoPedido - Pedido
LogEstadoPedido_1.default.belongsTo(Pedido_1.default, { foreignKey: "pedidos_id" });
Pedido_1.default.hasMany(LogEstadoPedido_1.default, { foreignKey: "pedidos_id" });
// LogEstadoPedido - EstadoPedido
LogEstadoPedido_1.default.belongsTo(EstadoPedido_1.default, { foreignKey: "estado_pedidos_id" });
EstadoPedido_1.default.hasMany(LogEstadoPedido_1.default, { foreignKey: "estado_pedidos_id" });
// LogEstadoPedido - Empleado
LogEstadoPedido_1.default.belongsTo(Empleado_1.default, { foreignKey: "empleados_id" });
Empleado_1.default.hasMany(LogEstadoPedido_1.default, { foreignKey: "empleados_id" });
// ProductoImagen - Producto
ProductoImagen_1.default.belongsTo(Producto_1.default, { foreignKey: "productos_id", as: "producto" });
Producto_1.default.hasMany(ProductoImagen_1.default, { foreignKey: "productos_id", as: "imagenes_producto" });
// ==================================================
// Relaciones del modelo Estado
// ==================================================
// Estado - GuiaDespacho
Estado_1.default.hasMany(GuiaDespacho_1.default, { foreignKey: "estados_id" });
GuiaDespacho_1.default.belongsTo(Estado_1.default, { foreignKey: "estados_id" });
// Estado - ComprobanteVenta
Estado_1.default.hasMany(ComprobanteVenta_1.default, { foreignKey: "estados_id" });
ComprobanteVenta_1.default.belongsTo(Estado_1.default, { foreignKey: "estados_id" });
// Region - Direccion
Region_1.default.hasMany(Direccion_1.default, { foreignKey: "region_id" });
Direccion_1.default.belongsTo(Region_1.default, { foreignKey: "region_id" });
// Comuna - Direccion
Comuna_1.default.hasMany(Direccion_1.default, { foreignKey: "comuna_id" });
Direccion_1.default.belongsTo(Comuna_1.default, { foreignKey: "comuna_id" });
// =================================================
const syncModels = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default.sync({ alter: true });
        console.log("Modelos sincronizados correctamente");
    }
    catch (error) {
        console.error("Error al sincronizar los modelos:", error);
    }
});
exports.syncModels = syncModels;
//# sourceMappingURL=index.js.map
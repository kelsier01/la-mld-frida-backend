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
const express_1 = __importDefault(require("express"));
const node_cron_1 = __importDefault(require("node-cron"));
const path_1 = __importDefault(require("path"));
// Conexiones BD
const connection_1 = __importDefault(require("../BD/connection"));
const auth_1 = __importDefault(require("../rutas/auth"));
// Rutas existentes
const usuario_1 = __importDefault(require("../rutas/usuario"));
const persona_1 = __importDefault(require("../rutas/persona"));
const cliente_1 = __importDefault(require("../rutas/cliente"));
const estado_1 = __importDefault(require("../rutas/estado"));
const rol_1 = __importDefault(require("../rutas/rol"));
// Nuevas rutas
const empleado_1 = __importDefault(require("../rutas/empleado"));
const estadoPedido_1 = __importDefault(require("../rutas/estadoPedido"));
const delivery_1 = __importDefault(require("../rutas/delivery"));
const guiaDespacho_1 = __importDefault(require("../rutas/guiaDespacho"));
const comprobanteVenta_1 = __importDefault(require("../rutas/comprobanteVenta"));
const pedido_1 = __importDefault(require("../rutas/pedido"));
const metodoPago_1 = __importDefault(require("../rutas/metodoPago"));
const pago_1 = __importDefault(require("../rutas/pago"));
const abono_1 = __importDefault(require("../rutas/abono"));
const bodega_1 = __importDefault(require("../rutas/bodega"));
const categoria_1 = __importDefault(require("../rutas/categoria"));
const marca_1 = __importDefault(require("../rutas/marca"));
const producto_1 = __importDefault(require("../rutas/producto"));
const detallePedido_1 = __importDefault(require("../rutas/detallePedido"));
const direccion_1 = __importDefault(require("../rutas/direccion"));
const productoBodega_1 = __importDefault(require("../rutas/productoBodega"));
const logEstadoPedido_1 = __importDefault(require("../rutas/logEstadoPedido"));
const productoImagen_1 = __importDefault(require("../rutas/productoImagen"));
const region_1 = __importDefault(require("../rutas/region"));
const comuna_1 = __importDefault(require("../rutas/comuna"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = require("./index");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
class Server {
    constructor() {
        this.apiPath = {
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
        this.CRON_SCHEDULE = "0 18 * * *"; // Ejecutar todos los días a las 9 AM
        this.ESTADOS = {
            RECEPCIONADO_CHILE: 3,
            LISTO_DESPACHAR: 4
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000";
        this.bdConnection();
        this.middlewares();
        this.routes();
        this.cronJobs();
    }
    bdConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log("Database Online");
                yield (0, index_1.syncModels)();
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json()); // Lectura y parseo del body
        this.app.use("/images", express_1.default.static(path_1.default.join("dist/public/images")));
    }
    routes() {
        // Rutas existentes
        this.app.use(this.apiPath.auth, auth_1.default);
        this.app.use(this.apiPath.users, usuario_1.default);
        this.app.use(this.apiPath.persona, persona_1.default);
        this.app.use(this.apiPath.cliente, cliente_1.default);
        this.app.use(this.apiPath.estado, estado_1.default);
        this.app.use(this.apiPath.rol, rol_1.default);
        // Nuevas rutas
        this.app.use(this.apiPath.empleado, empleado_1.default);
        this.app.use(this.apiPath.estadoPedido, estadoPedido_1.default);
        this.app.use(this.apiPath.delivery, delivery_1.default);
        this.app.use(this.apiPath.guiaDespacho, guiaDespacho_1.default);
        this.app.use(this.apiPath.comprobanteVenta, comprobanteVenta_1.default);
        this.app.use(this.apiPath.pedido, pedido_1.default);
        this.app.use(this.apiPath.metodoPago, metodoPago_1.default);
        this.app.use(this.apiPath.pago, pago_1.default);
        this.app.use(this.apiPath.abono, abono_1.default);
        this.app.use(this.apiPath.bodega, bodega_1.default);
        this.app.use(this.apiPath.categoria, categoria_1.default);
        this.app.use(this.apiPath.marca, marca_1.default);
        this.app.use(this.apiPath.producto, producto_1.default);
        this.app.use(this.apiPath.detallePedido, detallePedido_1.default);
        this.app.use(this.apiPath.direccion, direccion_1.default);
        this.app.use(this.apiPath.productoBodega, productoBodega_1.default);
        this.app.use(this.apiPath.logEstadoPedido, logEstadoPedido_1.default);
        this.app.use(this.apiPath.productoImagen, productoImagen_1.default);
        this.app.use(this.apiPath.region, region_1.default);
        this.app.use(this.apiPath.comuna, comuna_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor Conectado al puerto = " + this.port);
        });
    }
    cronJobs() {
        node_cron_1.default.schedule(this.CRON_SCHEDULE, () => __awaiter(this, void 0, void 0, function* () {
            console.log("[CronJob] Iniciando verificación de pedidos...");
            /* try {
              const pedidosHoy = await getPedidosByFechaEntrega();
              
              if (!pedidosHoy.length) {
                console.log("[CronJob] No hay pedidos programados para hoy");
                return;
              }
      
              console.log(`[CronJob] Pedidos encontrados para hoy: ${pedidosHoy.length}`);
      
              const pedidosAActualizar = pedidosHoy.filter(
                pedido => pedido.estado_pedidos_id === this.ESTADOS.RECEPCIONADO_CHILE
              );
      
              if (!pedidosAActualizar.length) {
                console.log("[CronJob] No hay pedidos que requieran actualización");
                return;
              }
      
              console.log(`[CronJob] Actualizando ${pedidosAActualizar.length} pedidos...`);
              
              const resultados = await Promise.allSettled(
                pedidosAActualizar.map(pedido => actualizarEstadoPedido(pedido.id))
              );
      
              // Contabilizar resultados
              const exitosos = resultados.filter(r => r.status === 'fulfilled').length;
              const fallidos = resultados.filter(r => r.status === 'rejected').length;
      
              console.log(`[CronJob] Proceso completado - Actualizados: ${exitosos}, Fallidos: ${fallidos}`);
      
            } catch (error) {
              console.error("[CronJob] Error en la tarea programada:", error);
            } */
        }), {
            scheduled: true,
            timezone: "America/Santiago"
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map
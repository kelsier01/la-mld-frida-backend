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
exports.obtenerPacientePorPersonaId = exports.obtenerDatosPaciente = exports.crearPaciente = void 0;
exports.getToken = getToken;
const axios_1 = __importDefault(require("axios"));
// Función para obtener el token del header
function getToken(req) {
    return req.header("x-token");
}
// Función para crear un paciente en el sistema especialista
const crearPaciente = (persona_id, prevision_id, estado_id, token, url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.post(url, {
            persona_id,
            prevision_id,
            estado_id: 1
        }, {
            headers: {
                'Content-Type': 'application/json',
                'x-token': token
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Error creando paciente en la base de datos especialista:", error);
        throw new Error("Error creando paciente en la base de datos especialista");
    }
});
exports.crearPaciente = crearPaciente;
// Función para obtener los datos de un paciente desde la API del especialista
const obtenerDatosPaciente = (paciente_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${process.env.API_URL}paciente/${paciente_id}`, {
            headers: { "x-token": token }
        });
        return response.data.paciente;
    }
    catch (error) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error("Error fetching paciente from especialista:", error.response.data);
        }
        else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error("No response received from especialista:", error.request);
        }
        else {
            // Algo sucedió al configurar la solicitud
            console.error("Error setting up request to especialista:", error.message);
        }
        throw new Error("Error obteniendo datos del paciente.");
    }
});
exports.obtenerDatosPaciente = obtenerDatosPaciente;
// Nueva función para obtener un paciente por persona_id
const obtenerPacientePorPersonaId = (persona_id, token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`${process.env.API_URL}paciente/persona/${persona_id}`, {
            headers: { "x-token": token }
        });
        return response.data.paciente;
    }
    catch (error) {
        console.error(`Error fetching paciente data for persona_id ${persona_id}:`, error);
        throw new Error("Error obteniendo datos del paciente por persona_id.");
    }
});
exports.obtenerPacientePorPersonaId = obtenerPacientePorPersonaId;
//# sourceMappingURL=personaHelpers.js.map
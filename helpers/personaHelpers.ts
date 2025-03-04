import axios from 'axios';
import { Request } from 'express';

// Función para obtener el token del header
export function getToken(req: Request): string | undefined {
    return req.header("x-token");
}

// Función para crear un paciente en el sistema especialista
export const crearPaciente = async (persona_id: number, prevision_id: number, estado_id: number, token: string, url: string) => {
    try {
        const response = await axios.post(url, {
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
    } catch (error) {
        console.error("Error creando paciente en la base de datos especialista:", error);
        throw new Error("Error creando paciente en la base de datos especialista");
    }
};

// Función para obtener los datos de un paciente desde la API del especialista
export const obtenerDatosPaciente = async (paciente_id: number, token: string) => {
    try {
        const response = await axios.get(`${process.env.API_URL}paciente/${paciente_id}`, {
            headers: { "x-token": token }
        });
        return response.data.paciente;
    } catch (error: any) {
        if (error.response) {
            // El servidor respondió con un código de estado fuera del rango 2xx
            console.error("Error fetching paciente from especialista:", error.response.data);
        } else if (error.request) {
            // La solicitud fue hecha pero no se recibió respuesta
            console.error("No response received from especialista:", error.request);
        } else {
            // Algo sucedió al configurar la solicitud
            console.error("Error setting up request to especialista:", error.message);
        }
        throw new Error("Error obteniendo datos del paciente.");
    }
};

// Nueva función para obtener un paciente por persona_id
export const obtenerPacientePorPersonaId = async (persona_id: number, token: string) => {
    try {
        const response = await axios.get(`${process.env.API_URL}paciente/persona/${persona_id}`, {
            headers: { "x-token": token }
        });
        return response.data.paciente;
    } catch (error: any) {
        console.error(`Error fetching paciente data for persona_id ${persona_id}:`, error);
        throw new Error("Error obteniendo datos del paciente por persona_id.");
    }
};



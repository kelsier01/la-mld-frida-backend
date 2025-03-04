import dotenv from 'dotenv';
import axios, {isCancel, AxiosError} from 'axios';

// Cargar las variables de entorno antes de hacer cualquier otra cosa
dotenv.config();

import Server from './models/server';

const server = new Server();

server.listen();

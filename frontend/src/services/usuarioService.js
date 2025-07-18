// frontend/src/services/productoService.js
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/usuarios';


export const createUsuario = data => axios.post(API_URL, data);

// frontend/src/services/emprendimientoService.js

export const obtenerEmprendimientos = (usuarioId) =>
axios.get(`http://localhost:3001/api/emprendimientos/${usuarioId}`);

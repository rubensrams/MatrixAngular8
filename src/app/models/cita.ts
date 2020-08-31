import { Usuarios } from './usuarios';
import { Anuncio } from './anuncio';
import { CitaEstatus } from './citaestatus';
export class Cita {
    folio: number;
    direccion: string;
    fecha: string;
    estatusCita: CitaEstatus;
    anuncio: Anuncio;
    usuario: Usuarios;
    usuarioCompra: Usuarios;
    comentarios: string;

} 

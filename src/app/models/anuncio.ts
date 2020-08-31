import { Categoria } from './categoria';
import { Estado } from './estado';
import { Usuarios } from './usuarios';
import { Galeria } from './galeria';
import { Cita } from './cita';
export class Anuncio {
    id: number;
    titulo: string;
    fecha: string;
    activo: number;
    precio: number;
    preview: string;
    descripcion: string;
    categoria: Categoria;
    estado: Estado;
    usuario: Usuarios;
    galeria: Galeria[];
    citas: Cita[];

} 

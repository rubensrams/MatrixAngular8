import { Roles } from './rol';
export class Usuarios {

    id: number;
    username: string;
    password: string;
    nombre: string;
    email: string;
    foto: string;
    activo: number;
    social: string;
    roles: any[] = [];

}

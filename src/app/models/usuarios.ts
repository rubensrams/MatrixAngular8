import { Roles } from './rol';
export class Usuarios {

    id: number;
    username: string;
    password: string;
    nombre: string;
    email: string;
    foto: string;
    social: string;
    roles: string[] = [];

}

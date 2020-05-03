import { Roles } from './rol';
export class Usuarios {

    id: number;
    username: string;
    password: string;
    nombre: string;
    email: string;
    roles: Roles[] = [];

}

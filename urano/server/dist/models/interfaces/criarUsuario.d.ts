import { Cargos } from "../enums/cargos";
export interface CriarUsuario {
    nome: string;
    email: string;
    cargo: Cargos | string;
    cpf: string;
    salario: number;
    status: boolean;
}

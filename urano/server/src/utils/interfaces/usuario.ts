import { Cargos } from "../enums/cargos";

export interface IUsuario{
    _id : string,
    nome : string,
    email: string,
    cargo: Cargos | string,
    cpf: string,
    salario: number,
    status: boolean,
}
import { Cargos } from "../enums/cargos";

export interface IInputCriarUsuario{
    nome: string,
    email: string,
    cargo?: Cargos | string,
    cpf: string,
    salario?: number,
    emailUsuarioLogado: string
}
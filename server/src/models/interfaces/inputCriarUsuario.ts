import { Cargos } from "../enums/cargos";

export interface IInputCriarUsuario{
    nome: string,
    email: string,
    telefone: string,
    cargo?: Cargos | string,
    cpf: string,
    emailUsuarioLogado: string
}
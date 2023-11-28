import { StatusPonto } from "../enums/statusPonto";

export interface IInputRegistrarPonto{
    chave: string,
    status: StatusPonto,
    justificativa?: string
}
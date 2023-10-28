import { StatusPonto } from "../enums/statusPonto";

export interface IInputRegistrarPonto{
    identificadorUnico : string,
    status: StatusPonto,
    justificativa?: string
}
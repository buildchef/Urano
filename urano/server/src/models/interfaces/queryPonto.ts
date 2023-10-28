import { Marcador } from "../enums/marcador";
import { StatusPonto } from "../enums/statusPonto";

export interface IQueryPonto {
    identificadorUnico?: string,
    data?: string,
    status?: StatusPonto
    marcador?: Marcador
}
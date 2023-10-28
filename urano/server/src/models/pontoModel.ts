import mongoose, { Schema, Document } from "mongoose";
import { StatusPonto } from "./enums/statusPonto";
import { Marcador } from "./enums/marcador";

export interface IPonto extends Document{
    identificadorUnico : string,
    data: string,
    horario: string,
    horasTrabalhadas: string,
    status: StatusPonto,
    justificativa?: string,
    marcador?: Marcador,
}

const PontoSchema = new Schema<IPonto>({
    identificadorUnico: { type: String, required: true },
    data: { type: String, required: true },
    horario: { type: String, required: true},
    horasTrabalhadas: { type: String, required: true },
    status: { type: String, required: true },
    justificativa: { type: String, required: false },
    marcador: { type: String, required: false },
})

const Ponto = mongoose.model<IPonto>('Ponto', PontoSchema, "ponto");

export default Ponto;
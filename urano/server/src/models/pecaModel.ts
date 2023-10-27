import mongoose, { Schema, Document } from "mongoose";
import { ClassePeca } from "./enums/classePeca";

export interface IPeca extends Document{
    nome : string,
    codigo: string,
    classe: ClassePeca | string,
    preco: string,
    status: boolean,
}

const PecaSchema = new Schema<IPeca>({
    nome: { type: String, required: true },
    codigo: { type: String, required: true },
    classe: { type: String, required: true},
    preco: { type: String, required: true },
    status: { type: Boolean, required: true },
})

const Peca = mongoose.model<IPeca>('Peca', PecaSchema, "peca");

export default Peca;
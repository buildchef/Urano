import mongoose, { Schema, Document } from "mongoose";
import { ClassePeca } from "./enums/classePeca";

export interface IPeca extends Document{
    nome : string,
    codigo: string,
    classe: ClassePeca | string,
    preco: string,
    status: boolean,
    quantidade: string
}

const PecaSchema = new Schema<IPeca>({
    nome: { type: String, required: true },
    codigo: { type: String, required: true },
    classe: { type: String, required: false},
    preco: { type: String, required: false },
    status: { type: Boolean, required: false },
    quantidade: { type: String, required: true }
})

const Peca = mongoose.model<IPeca>('Peca', PecaSchema, "peca");

export default Peca;
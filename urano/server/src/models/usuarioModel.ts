import mongoose, { Schema, Document } from "mongoose";
import { Cargos } from "../models/enums/cargos";

export interface IUsuario extends Document{
    nome : string,
    email: string,
    senha: string,
    telefone: string,
    cargo: Cargos | string,
    cpf: string,
    status: boolean,
}

const UsuarioSchema = new Schema<IUsuario>({
    nome: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true},
    telefone: { type: String, required: true},
    cargo: { type: String, required: true },
    cpf: { type: String, required: true },
    status: { type: Boolean, required: true },
})

const Usuario = mongoose.model<IUsuario>('Usuario', UsuarioSchema, "usuario");

export default Usuario;
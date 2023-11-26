import mongoose, { Schema, Document } from "mongoose";
import { Cargos } from "../models/enums/cargos";

export interface IUsuario extends Document{
    _doc: any,
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
    telefone: { type: String, required: false},
    cargo: { type: String, required: false },
    cpf: { type: String, required: false },
    status: { type: Boolean, required: false },
})

const Usuario = mongoose.model<IUsuario>('Usuario', UsuarioSchema, "usuario");

export default Usuario;
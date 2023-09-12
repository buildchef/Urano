import mongoose, { Document } from "mongoose";
import { Cargos } from "../models/enums/cargos";
export interface IUsuario extends Document {
    nome: string;
    email: string;
    telefone: string;
    cargo: Cargos | string;
    cpf: string;
    status: boolean;
}
declare const Usuario: mongoose.Model<IUsuario, {}, {}, {}, mongoose.Document<unknown, {}, IUsuario> & IUsuario & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default Usuario;

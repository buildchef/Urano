import mongoose, { Document } from "mongoose";
import { Cargos } from "../models/enums/cargos";
export interface IUsuario extends Document {
    nome: string;
    email: string;
    cargo: Cargos | string;
    cpf: string;
    salario: number;
    status: boolean;
}
declare const Usuario: mongoose.Model<IUsuario, {}, {}, {}, mongoose.Document<unknown, {}, IUsuario> & IUsuario & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default Usuario;

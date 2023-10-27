import mongoose, { Document } from "mongoose";
import { ClassePeca } from "./enums/classePeca";
export interface IPeca extends Document {
    nome: string;
    codigo: string;
    classe: ClassePeca | string;
    preco: string;
    status: boolean;
}
declare const Peca: mongoose.Model<IPeca, {}, {}, {}, mongoose.Document<unknown, {}, IPeca> & IPeca & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default Peca;

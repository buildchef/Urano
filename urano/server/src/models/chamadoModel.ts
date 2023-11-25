import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const chamadoSchema = new mongoose.Schema({
    titulo: String,
    codigo: String,
    descricao: String,
    dataCriacao: {
        type: Date,
        default: Date.now,
    },
    dataAtualizacao: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Backlog', 'Em Andamento', 'Concluído'],
        required: true,
    },
    prioridade: {
        type: String,
        enum: ['Muito baixa', 'Baixa', 'Média', 'Alta', 'Muito alta'],
        required: true,
    },
    categoria: {    
        type: String,
        enum: ['Manutenção Preventiva', 'Manutenção Corretiva', 'Melhoria'],
        required: true,
    },
    solicitante: String,
    responsavel: String,
});

const Chamado = mongoose.model('Manutencao', chamadoSchema, 'manutencao');

export default Chamado;
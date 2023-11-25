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
    prioridade: [{
        tipo: {
            type: String,
            enum: ['Muito baixa', 'Baixa', 'Média', 'Alta', 'Muito alta'],
            required: true,
        },
    }],
    categoria: {    
        type: String,
        enum: ['Manutenção Preventiva', 'Manutenção Corretiva', 'Melhoria'],
        required: true,
    },
    solicitante: [{
        displayName: String,
        email: String,
        ativo: Boolean,
        avatarUrl: String,
    }],
    responsavel: [{
        displayName: String,
        email: String,
        ativo: Boolean,
        avatarUrl: String,
    }],
    estimativa: {
        type: Number,
        enum: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377],
        required: true,
    },
    comentarios: [{
        comentario: [{
            id: {
                type: Number,
                unique: true,
            },
            autor: {
                displayName: String,
                email: String,
                ativo: Boolean,
                avatarUrl: String,
            },
            dataCriacao: {
                type: Date,
                default: Date.now,
            },
            dataAtualizacao: {
                type: Date,
                default: Date.now,
            },
            body: String,
        }],
        maxResults: Number,
        totalResults: Number,
    }]

});

const Chamado = mongoose.model('Chamado', chamadoSchema, 'chamado');

export default Chamado;
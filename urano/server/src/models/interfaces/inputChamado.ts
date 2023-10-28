interface IPrioridade {
    id: number;
    tipo: string;
}

interface IUsuario {
    displayName: string;
    email: string;
    ativo: boolean;
    avatarUrl: string;
}

interface IComentario {
    comentario: [{
        id: Number,
        autor: IUsuario[],
        dataCriacao: Date,
        dataAtualizacao: Date,
        body: string,
    }]
}

export interface IInputChamado {
    titulo: string;
    descricao: string;
    dataCriacao: Date;
    dataAtualizacao: Date;
    status: string;
    prioridade: IPrioridade[];
    categoria: string;
    solicitante: IUsuario[];
    responsavel: IUsuario[];
    estimativa: number;
    comentarios: IComentario[];
}
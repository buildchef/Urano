interface IHistoricoManutencao {
    tipoManutencao: string;
    data: Date;
    descricao: string;
    custo: number;
}

interface IHistoricoVoos {
    destino: string;
    data: Date;
    duracao: number;
}

export interface IInputAviao {
    numeroSerie: string;
    modelo: string;
    fabricante: string;
    anoFabricacao: number;
    capacidadePassageiros: number;
    historicoManutencao: IHistoricoManutencao[];
    statusDisponibilidade: any;
    localizacaoAtual: any;
    historicoVoos: IHistoricoVoos[];
    statusManutencao: string;
}
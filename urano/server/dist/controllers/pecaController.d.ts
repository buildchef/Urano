import { IInputAdicionarPeca } from "../models/interfaces/inputAdicionarPeca";
import { IInputContarPecas } from "../models/interfaces/inputContarPecas";
import { IInputTrocarStatusPeca } from "../models/interfaces/inputTrocarStatusPeca";
import { IQueryPecas } from "../models/interfaces/queryPecas";
import { IPeca } from "../models/pecaModel";
import { PecaService } from "../services/pecaService";
export declare class PecaController {
    pecaService: PecaService;
    adicionar(body: IInputAdicionarPeca): Promise<IPeca | object>;
    listar(): Promise<IPeca[]>;
    buscar(body: IQueryPecas): Promise<IPeca[]>;
    contarPecas(body: IInputContarPecas): Promise<number>;
    desabilitar(body: IInputTrocarStatusPeca): Promise<boolean>;
    habilitar(body: IInputTrocarStatusPeca): Promise<boolean>;
}

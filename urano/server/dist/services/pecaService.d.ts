import { IInputAdicionarPeca } from "../models/interfaces/inputAdicionarPeca";
import { IInputContarPecas } from "../models/interfaces/inputContarPecas";
import { IInputTrocarStatusPeca } from "../models/interfaces/inputTrocarStatusPeca";
import { IQueryPecas } from "../models/interfaces/queryPecas";
import { IPeca } from "../models/pecaModel";
import { PecasValidators } from "../validators/pecasValidators";
import { UsuarioService } from "./usuarioService";
export declare class PecaService {
    validator: PecasValidators;
    usuarioService: UsuarioService;
    listar(): Promise<IPeca[]>;
    adicionar(inputAdicionarPeca: IInputAdicionarPeca): Promise<IPeca | object>;
    buscar(query: IQueryPecas): Promise<IPeca[]>;
    contarPecas(inputContarPecas: IInputContarPecas): Promise<number>;
    desabilitar(inputDesabilitarPeca: IInputTrocarStatusPeca): Promise<boolean>;
    habilitar(inputHabilitarPeca: IInputTrocarStatusPeca): Promise<boolean>;
}

import { IInputAdicionarPeca } from "../models/interfaces/inputAdicionarPeca";
import { IInputContarPecas } from "../models/interfaces/inputContarPecas";
import { IInputTrocarStatusPeca } from "../models/interfaces/inputTrocarStatusPeca";
import { IQueryPecas } from "../models/interfaces/queryPecas";
import { IPeca } from "../models/pecaModel";
import { Validators } from "../validators/validators";
import { UsuarioService } from "./usuarioService";
export declare class PecaService {
    validator: Validators;
    usuarioService: UsuarioService;
    listar(): Promise<IPeca[]>;
    adicionar(inputAdicionarPeca: IInputAdicionarPeca): Promise<IPeca>;
    buscar(query: IQueryPecas): Promise<IPeca[]>;
    contarPecas(inputContarPecas: IInputContarPecas): Promise<number>;
    desabilitar(inputDesabilitarPeca: IInputTrocarStatusPeca): Promise<boolean>;
    habilitar(inputHabilitarPeca: IInputTrocarStatusPeca): Promise<boolean>;
}

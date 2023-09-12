import { IInputCriarUsuario } from "../models/interfaces/inputCriarUsuario";
import { IQuery } from "../models/interfaces/query";
import { IUsuario } from "../models/usuarioModel";
import { IInputAtualizarUsuario } from "../models/interfaces/inputAtualizarUsuario";
import { IInputAlterarStatusUsuario } from "../models/interfaces/inputAlterarStatusUsuario";
import { Validators } from "../validators/validators";
export declare class UsuarioService {
    validator: Validators;
    criar(inputCriarUsuario: IInputCriarUsuario): Promise<IUsuario | object>;
    listar(): Promise<IUsuario[] | object>;
    buscar(query: IQuery): Promise<IUsuario[] | any[]>;
    atualizar(inputAtualizarUsuario: IInputAtualizarUsuario): Promise<IUsuario | object>;
    desativar(inputAlterarStatusUsuario: IInputAlterarStatusUsuario): Promise<IUsuario | object>;
    ativar(inputAlterarStatusUsuario: IInputAlterarStatusUsuario): Promise<IUsuario | object>;
}

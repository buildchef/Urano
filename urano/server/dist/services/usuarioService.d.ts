import { IInputCriarUsuario } from "../models/interfaces/inputCriarUsuario";
import { IUsuario } from "../models/usuarioModel";
export declare class UsuarioService {
    retornarUsuarioPorEmail(email: string): Promise<IUsuario | object>;
    criar(inputCriarUsuario: IInputCriarUsuario): Promise<IUsuario | object>;
    listar(): Promise<IUsuario[] | object>;
}

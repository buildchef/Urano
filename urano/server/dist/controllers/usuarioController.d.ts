import { IInputCriarUsuario } from "../models/interfaces/inputCriarUsuario";
import { IUsuario } from "../models/usuarioModel";
import { UsuarioService } from "../services/usuarioService";
export declare class UsuarioController {
    usuarioService: UsuarioService;
    criar(body: IInputCriarUsuario): Promise<IUsuario | object>;
    listar(): Promise<IUsuario[] | object>;
}

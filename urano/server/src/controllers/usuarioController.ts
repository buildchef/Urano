import { IInputCriarUsuario } from "../models/interfaces/inputCriarUsuario";
import { IUsuario } from "../models/usuarioModel";
import { UsuarioService } from "../services/usuarioService";

export class UsuarioController{
    usuarioService: UsuarioService = new UsuarioService();

    async criar(body: IInputCriarUsuario): Promise<IUsuario | object>{
        return await this.usuarioService.criar(body);
    }

    async listar(): Promise<IUsuario[] | object>{
        return this.usuarioService.listar();
    }
}
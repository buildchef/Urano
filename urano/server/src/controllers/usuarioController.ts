import { IInputCriarUsuario } from "../models/interfaces/inputCriarUsuario";
import { IQuery } from "../models/interfaces/query";
import { IUsuario } from "../models/usuarioModel";
import { UsuarioService } from "../services/usuarioService";

export class UsuarioController{
    usuarioService: UsuarioService = new UsuarioService();

    async criar(body: IInputCriarUsuario): Promise<IUsuario | object>{
        return await this.usuarioService.criar(body);
    }

    async listar(): Promise<IUsuario[] | object>{
        return await this.usuarioService.listar();
    }

    async buscar(body: IQuery): Promise<IUsuario[] | object>{
       return await this.usuarioService.buscar(body);
    }
}
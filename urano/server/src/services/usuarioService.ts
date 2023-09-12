import { ObjectId } from "mongodb";
import { Cargos } from "../models/enums/cargos";
import { IInputCriarUsuario } from "../models/interfaces/inputCriarUsuario";
import { IQuery } from "../models/interfaces/query";
import Usuario, { IUsuario } from "../models/usuarioModel";

export class UsuarioService{
    public async retornarUsuarioPorEmail(email: string): Promise<IUsuario | object>{
        try{
        const usuarioLogado = await Usuario.findOne({email: email});
        return usuarioLogado? usuarioLogado : {};
        } catch(error){
            return {};
        }
    }

    public async criar(inputCriarUsuario: IInputCriarUsuario): Promise<IUsuario | object>{
        try{
            const usuarioLogado = await this.retornarUsuarioPorEmail(inputCriarUsuario.emailUsuarioLogado);

            if(Object.keys(usuarioLogado).length > 0){
                const usuario: IUsuario = new Usuario({
                    nome: inputCriarUsuario.nome,
                    email: inputCriarUsuario.email,
                    cpf: inputCriarUsuario.cpf,
                    cargo: inputCriarUsuario.cargo || Cargos.ESTAGIARIO,
                    salario: inputCriarUsuario.salario || 2000.00,
                    status: true
                })
                
                const usuarioSalvo = await usuario.save();
                return usuarioSalvo;
            }

            throw new Error("Usuario logado não encontrado na base de dados.");
            
        } catch(error){
            return {};
        }
    }

    public async listar(): Promise<IUsuario[] | object>{
        try{
            const usuarios = await Usuario.find();
            return usuarios;
        } catch(error){
            return {};
        }
    }

    public async buscar(query: IQuery): Promise<IUsuario[] | object>{
        try{
            const usuarioEncontrado: IUsuario[] = await Usuario.find(query);
            return usuarioEncontrado;
        } catch(error){
            return {}
        }

    }
}
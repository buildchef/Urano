import { Cargos } from "../models/enums/cargos";
import { IInputCriarUsuario } from "../models/interfaces/inputCriarUsuario";
import { IQuery } from "../models/interfaces/query";
import Usuario, { IUsuario } from "../models/usuarioModel";
import { IInputAtualizarUsuario } from "../models/interfaces/inputAtualizarUsuario";
import { IInputAlterarStatusUsuario } from "../models/interfaces/inputAlterarStatusUsuario";

export class UsuarioService{
    public async criar(inputCriarUsuario: IInputCriarUsuario): Promise<IUsuario | object>{
        try{
            const usuarioLogado = await this.buscar({email: inputCriarUsuario.emailUsuarioLogado});

            if(Object.keys(usuarioLogado).length > 0){
                const usuario: IUsuario = new Usuario({
                    nome: inputCriarUsuario.nome,
                    email: inputCriarUsuario.email,
                    cpf: inputCriarUsuario.cpf,
                    cargo: inputCriarUsuario.cargo || Cargos.ESTAGIARIO,
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

    public async buscar(query: IQuery): Promise<IUsuario[] | any[]>{
        try{
            const usuarioEncontrado: IUsuario[] = await Usuario.find(query);
            return usuarioEncontrado;
        } catch(error){
            return []
        }

    }

    public async atualizar(inputAtualizarUsuario: IInputAtualizarUsuario): Promise<IUsuario | object> {
        try{
            const BuscaUsuarioDB: IUsuario[] | any[] = await this.buscar({cpf: inputAtualizarUsuario.cpf});
            const usuarioLogado: IUsuario[] | any[] = await this.buscar({email: inputAtualizarUsuario.emailUsuarioLogado});

            if(BuscaUsuarioDB.length > 0 && usuarioLogado.length > 0){
                const usuarioMongo: IUsuario = BuscaUsuarioDB[0]; 
                usuarioMongo.nome = inputAtualizarUsuario.nome? inputAtualizarUsuario.nome: usuarioMongo.nome;
                usuarioMongo.email = inputAtualizarUsuario.email? inputAtualizarUsuario.email: usuarioMongo.email;
                usuarioMongo.telefone = inputAtualizarUsuario.telefone? inputAtualizarUsuario.telefone: usuarioMongo.telefone;
                usuarioMongo.cargo = inputAtualizarUsuario.cargo? inputAtualizarUsuario.cargo: usuarioMongo.cargo;

                const usuarioAtualizado = await usuarioMongo.save();
                return usuarioAtualizado;
            }

            throw new Error('Não foi possível atualizar o usuário.')

        } catch(error){
            return {};
        }
    }

    public async desativar(inputAlterarStatusUsuario: IInputAlterarStatusUsuario): Promise<IUsuario | object> {
        try{
            const buscaUsuario = await this.buscar({cpf: inputAlterarStatusUsuario.cpf});
            const usuarioLogado = await this.buscar({email: inputAlterarStatusUsuario.emailUsuarioLogado});

            if(buscaUsuario.length > 0 && usuarioLogado.length > 0 && buscaUsuario[0].status) {
                const usuarioDb: IUsuario = buscaUsuario[0];
                usuarioDb.status = false;
                const usuarioAtualizado: IUsuario = await usuarioDb.save();
                return usuarioAtualizado;
            }

            throw new Error('Não foi possível desativar o usuário.');
        } catch (error){
            return {};
        }
    }

    public async ativar(inputAlterarStatusUsuario: IInputAlterarStatusUsuario): Promise<IUsuario | object> {
        try{
            const buscaUsuario = await this.buscar({cpf: inputAlterarStatusUsuario.cpf});
            const usuarioLogado = await this.buscar({email: inputAlterarStatusUsuario.emailUsuarioLogado});

            if(buscaUsuario.length > 0 && usuarioLogado.length > 0 && !buscaUsuario[0].status) {
                const usuarioDb: IUsuario = buscaUsuario[0];
                usuarioDb.status = true;
                const usuarioAtualizado: IUsuario = await usuarioDb.save();
                return usuarioAtualizado;
            }

            throw new Error('Não foi possível desativar o usuário.');
        } catch (error){
            return {};
        }
    }
}
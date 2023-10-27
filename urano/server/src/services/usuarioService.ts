import { Cargos } from "../models/enums/cargos";
import { IInputCriarUsuario } from "../models/interfaces/inputCriarUsuario";
import { IQuery } from "../models/interfaces/query";
import Usuario, { IUsuario } from "../models/usuarioModel";
import { IInputAtualizarUsuario } from "../models/interfaces/inputAtualizarUsuario";
import { IInputAlterarStatusUsuario } from "../models/interfaces/inputAlterarStatusUsuario";
import { Validators } from "../validators/validators";

export class UsuarioService{
    validator = new Validators();

    public async criar(inputCriarUsuario: IInputCriarUsuario): Promise<IUsuario>{
        const { error, value } = this.validator.validarInputCriarUsuario(inputCriarUsuario);
        const validaCpf = this.validator.validarCpf(inputCriarUsuario.cpf);
        const usuarioDb = await this.buscar({cpf: inputCriarUsuario.cpf});

        if(!error && validaCpf && usuarioDb.length === 0){
            const usuario: IUsuario = new Usuario({
                nome: inputCriarUsuario.nome,
                email: inputCriarUsuario.email,
                telefone: inputCriarUsuario.telefone,
                cpf: inputCriarUsuario.cpf,
                cargo: inputCriarUsuario.cargo || Cargos.ESTAGIARIO,
                status: true
            });
            
            const usuarioSalvo = await usuario.save();
            return usuarioSalvo;
        }

        throw new Error("Informações inválidas.");
    }

    public async listar(): Promise<IUsuario[]>{
        const usuarios = await Usuario.find();
        return usuarios;
    }

    public async buscar(query: IQuery): Promise<IUsuario[]>{
        const { error, value } = this.validator.validarQuery(query);
        const validaCpf = query.cpf? this.validator.validarCpf(query.cpf): true;
        if (!error && validaCpf){
            const usuarioEncontrado: IUsuario[] = await Usuario.find(query);
            return usuarioEncontrado;
        }
        throw new Error('Erro ao buscar no banco de dados.');
    }

    public async atualizar(inputAtualizarUsuario: IInputAtualizarUsuario): Promise<IUsuario | object> {
        const { error, value } = this.validator.validarInputAtualizarUsuario(inputAtualizarUsuario);
        const validaCpf = this.validator.validarCpf(inputAtualizarUsuario.cpf);

        if(!error && validaCpf){
            const buscaUsuarioDB: IUsuario[] = await this.buscar({cpf: inputAtualizarUsuario.cpf});

            if(buscaUsuarioDB.length > 0 && buscaUsuarioDB[0].status){
                const usuarioMongo: IUsuario = buscaUsuarioDB[0]; 
                usuarioMongo.nome = inputAtualizarUsuario.nome? inputAtualizarUsuario.nome: usuarioMongo.nome;
                usuarioMongo.email = inputAtualizarUsuario.email? inputAtualizarUsuario.email: usuarioMongo.email;
                usuarioMongo.telefone = inputAtualizarUsuario.telefone? inputAtualizarUsuario.telefone: usuarioMongo.telefone;
                usuarioMongo.cargo = inputAtualizarUsuario.cargo? inputAtualizarUsuario.cargo: usuarioMongo.cargo;

                const usuarioAtualizado = await usuarioMongo.save();
                return usuarioAtualizado;
            }

            throw new Error("Informações inválidas.");
        }

        throw new Error('Não foi possível atualizar o usuário.')
    }

    public async desativar(inputAlterarStatusUsuario: IInputAlterarStatusUsuario): Promise<IUsuario | object> {
        const { error, value } = this.validator.validarInputAlterarStatusUsuario(inputAlterarStatusUsuario);
        const validaCpf = this.validator.validarCpf(inputAlterarStatusUsuario.cpf);

        if(!error && validaCpf){
            const buscaUsuario = await this.buscar({cpf: inputAlterarStatusUsuario.cpf});

            if(buscaUsuario.length > 0 && buscaUsuario[0].status) {
                const usuarioDb: IUsuario = buscaUsuario[0];
                usuarioDb.status = false;
                const usuarioAtualizado: IUsuario = await usuarioDb.save();
                return usuarioAtualizado;
            }
            throw new Error("Informações inválidas.");
        }

        throw new Error('Não foi possível desativar o usuário.');
    }

    public async ativar(inputAlterarStatusUsuario: IInputAlterarStatusUsuario): Promise<IUsuario | object> {
        const { error, value } = this.validator.validarInputAlterarStatusUsuario(inputAlterarStatusUsuario);
        const validaCpf = this.validator.validarCpf(inputAlterarStatusUsuario.cpf);

        if(!error && validaCpf){
            const buscaUsuario = await this.buscar({cpf: inputAlterarStatusUsuario.cpf});

            if(buscaUsuario.length > 0 && !buscaUsuario[0].status) {
                const usuarioDb: IUsuario = buscaUsuario[0];
                usuarioDb.status = true;
                const usuarioAtualizado: IUsuario = await usuarioDb.save();
                return usuarioAtualizado;
            }
            throw new Error("Informações inválidas.");
        }

        throw new Error('Não foi possível desativar o usuário.');
    }
}
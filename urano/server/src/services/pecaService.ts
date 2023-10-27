import { ClassePeca } from "../models/enums/classePeca";
import { IInputAdicionarPeca } from "../models/interfaces/inputAdicionarPeca";
import { IInputContarPecas } from "../models/interfaces/inputContarPecas";
import { IInputTrocarStatusPeca } from "../models/interfaces/inputTrocarStatusPeca";
import { IQueryPecas } from "../models/interfaces/queryPecas";
import Peca, { IPeca } from "../models/pecaModel";
import { PecasValidators } from "../validators/pecasValidators";
import { UsuarioService } from "./usuarioService";

export class PecaService {
    validator = new PecasValidators();
    usuarioService = new UsuarioService();

    public async listar(): Promise<IPeca[]>{
        try{
            const resultado = Peca.find();
            return resultado;
        } catch(error){
            return []
        }
    }

    public async adicionar(inputAdicionarPeca: IInputAdicionarPeca): Promise<IPeca | object> {
        try{
            inputAdicionarPeca.classe = inputAdicionarPeca.classe.toUpperCase();
            const { error, value } = this.validator.validarInputAdicionarPeca(inputAdicionarPeca);
            const usuarioLogado = await this.usuarioService.buscar({ email: inputAdicionarPeca.emailUsuarioLogado });
            const pecaVerificar = await this.buscar({ classe: inputAdicionarPeca.classe, codigo: inputAdicionarPeca.codigo});

            if(usuarioLogado.length <= 0 || error || pecaVerificar.length > 0){
                throw new Error("Erro na validacao. Os dados informados sao invalidos.");
            };

            // @ts-ignore
            const novaPeca: IPeca = new Peca({
                nome: inputAdicionarPeca.nome,
                codigo: inputAdicionarPeca.codigo,
                // @ts-ignore
                classe: ClassePeca[inputAdicionarPeca.classe.toUpperCase()],
                preco: inputAdicionarPeca.preco,
                status: true
            });

            const pecaSalva = await novaPeca.save();
            return pecaSalva;
        } catch(error) {
            return {};
        }
    }

    public async buscar(query: IQueryPecas): Promise<IPeca[]> {
        try {
            if(query.classe){query.classe = query.classe.toUpperCase()};
            const { error, value } = this.validator.validarQueryPecas(query);

            if(error) {
                throw new Error('Erro na validacao. Os dados informados sao invalidos.');
            };

            // @ts-ignore
            if(query.classe){query.classe = ClassePeca[query.classe]}

            const pecas = await Peca.find(query);
            return pecas;
        } catch(error) {
            return [];
        }
    }

    public async contarPecas(inputContarPecas: IInputContarPecas): Promise<number>{
        try {
            inputContarPecas.classe = inputContarPecas.classe.toUpperCase();
            const { error, value } = this.validator.validarInpuContarPecas(inputContarPecas);

            if(error) {
                throw new Error('Erro na validacao. Os dados informados sao invalidos.');
            };

            const pecas = await this.buscar({ classe: inputContarPecas.classe });

            let contador = 0;

            pecas.forEach((peca) => {
                if(peca.status){contador++};
            });

            return contador;
        } catch(error) {
            return -1
        }
    }

    public async desabilitar(inputDesabilitarPeca: IInputTrocarStatusPeca): Promise<boolean>{
        try{
            inputDesabilitarPeca.classe = inputDesabilitarPeca.classe.toUpperCase();
            const { error, value } = this.validator.validarInputDesabilitarPeca(inputDesabilitarPeca);
            const usuarioLogado = await this.usuarioService.buscar({ email: inputDesabilitarPeca.emailUsuarioLogado });

            if(error || usuarioLogado.length <= 0) {
                throw new Error('Erro na validacao. Os dados informados sao invalidos.');
            };

            const query = {
                codigo: inputDesabilitarPeca.codigo,
                // @ts-ignore
                classe: ClassePeca[inputDesabilitarPeca.classe.toUpperCase()]
            };

            const peca = await Peca.findOne(query);

            if(peca) {
                peca.status = peca.status ? false : peca.status;
                await peca.save(); 
                return true;
            }

            throw new Error("Peca não encontrada");
        } catch(error) {
            return false;
        }
    }

    public async habilitar(inputHabilitarPeca: IInputTrocarStatusPeca): Promise<boolean>{
        try{
            inputHabilitarPeca.classe = inputHabilitarPeca.classe.toUpperCase();
            const { error, value } = this.validator.validarInputDesabilitarPeca(inputHabilitarPeca);
            const usuarioLogado = await this.usuarioService.buscar({ email: inputHabilitarPeca.emailUsuarioLogado });

            if(error || usuarioLogado.length <= 0) {
                throw new Error('Erro na validacao. Os dados informados sao invalidos.');
            };

            const query = {
                codigo: inputHabilitarPeca.codigo,
                // @ts-ignore
                classe: ClassePeca[inputHabilitarPeca.classe.toUpperCase()]
            };

            const peca = await Peca.findOne(query);

            if(peca) {
                peca.status = !peca.status ? true : peca.status;
                await peca.save(); 
                return true;
            }

            throw new Error("Peca não encontrada");
        } catch(error) {
            return false;
        }
    }
}
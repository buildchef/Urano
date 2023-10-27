import { ClassePeca } from "../models/enums/classePeca";
import { IInputAdicionarPeca } from "../models/interfaces/inputAdicionarPeca";
import { IInputContarPecas } from "../models/interfaces/inputContarPecas";
import { IInputTrocarStatusPeca } from "../models/interfaces/inputTrocarStatusPeca";
import { IQueryPecas } from "../models/interfaces/queryPecas";
import Peca, { IPeca } from "../models/pecaModel";
import { Validators } from "../validators/validators";
import { UsuarioService } from "./usuarioService";

export class PecaService {
    validator = new Validators();
    usuarioService = new UsuarioService();

    public async listar(): Promise<IPeca[]>{
        const resultado = Peca.find();
        return resultado;
    }

    public async adicionar(inputAdicionarPeca: IInputAdicionarPeca): Promise<IPeca> {
        inputAdicionarPeca.classe = inputAdicionarPeca.classe.toUpperCase();
        const { error, value } = this.validator.validarInputAdicionarPeca(inputAdicionarPeca);
        const pecaVerificar = await this.buscar({ classe: inputAdicionarPeca.classe, codigo: inputAdicionarPeca.codigo});

        if(error || pecaVerificar.length > 0){
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
    }

    public async buscar(query: IQueryPecas): Promise<IPeca[]> {
        if(query.classe){query.classe = query.classe.toUpperCase()};
        const { error, value } = this.validator.validarQueryPecas(query);

        if(error) {
            throw new Error('Erro na validacao. Os dados informados sao invalidos.');
        };

        // @ts-ignore
        if(query.classe){query.classe = ClassePeca[query.classe]}

        const pecas = await Peca.find(query);
        return pecas;
    }

    public async contarPecas(inputContarPecas: IInputContarPecas): Promise<number>{
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
    }

    public async desabilitar(inputDesabilitarPeca: IInputTrocarStatusPeca): Promise<boolean>{
        inputDesabilitarPeca.classe = inputDesabilitarPeca.classe.toUpperCase();
        const { error, value } = this.validator.validarInputDesabilitarPeca(inputDesabilitarPeca);

        if(error) {
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
    }

    public async habilitar(inputHabilitarPeca: IInputTrocarStatusPeca): Promise<boolean>{
        inputHabilitarPeca.classe = inputHabilitarPeca.classe.toUpperCase();
        const { error, value } = this.validator.validarInputDesabilitarPeca(inputHabilitarPeca);

        if(error) {
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
    }
}
import { IInputAdicionarPeca } from "../models/interfaces/inputAdicionarPeca";
import { IInputContarPecas } from "../models/interfaces/inputContarPecas";
import { IInputTrocarStatusPeca } from "../models/interfaces/inputTrocarStatusPeca";
import { IQueryPecas } from "../models/interfaces/queryPecas";
import { IPeca } from "../models/pecaModel";
import { PecaService } from "../services/pecaService";

export class PecaController{
    pecaService: PecaService = new PecaService();

    async adicionar(body: IInputAdicionarPeca): Promise<IPeca | object>{
        return await this.pecaService.adicionar(body);
    }

    async listar(): Promise<IPeca[]>{
        return await this.pecaService.listar();
    }

    async buscar(body: IQueryPecas): Promise<IPeca[]>{
       return await this.pecaService.buscar(body);
    }

    async contarPecas(body: IInputContarPecas): Promise<number> {
        return await this.pecaService.contarPecas(body);
    }

    async desabilitar(body: IInputTrocarStatusPeca): Promise<boolean> {
        return await this.pecaService.desabilitar(body);
    }

    async habilitar(body: IInputTrocarStatusPeca): Promise<boolean> {
        return await this.pecaService.habilitar(body);
    }
} 
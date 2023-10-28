import { IInputRegistrarPonto } from "../models/interfaces/inputRegistrarPonto";
import { IQueryPonto } from "../models/interfaces/queryPonto";
import { IPonto } from "../models/pontoModel";
import { PontoService } from "../services/pontoService";

export class PontoController {
    pontoService = new PontoService();

    public async registrarPonto(body: IInputRegistrarPonto): Promise<IPonto>{
        return await this.pontoService.registrarPonto(body);
    }

    public async listar(): Promise<IPonto[]>{
        return await this.pontoService.listar();
    }

    public async buscar(query: IQueryPonto): Promise<IPonto[]>{
        return await this.pontoService.buscar(query);
    }

}
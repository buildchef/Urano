import { HorasTrabalhadas } from "../models/enums/horasTrabalhadas";
import { Justificativa } from "../models/enums/justificativa";
import { Marcador } from "../models/enums/marcador";
import { StatusPonto } from "../models/enums/statusPonto";
import { IInputRegistrarPonto } from "../models/interfaces/inputRegistrarPonto";
import { IQueryPonto } from "../models/interfaces/queryPonto";
import Ponto, { IPonto } from "../models/pontoModel";
import { Validators } from "../validators/validators";
import { UsuarioService } from "./usuarioService";

export class PontoService {
    usuarioService = new UsuarioService();
    validator = new Validators();


    public async registrarPonto(inputRegistrarPonto: IInputRegistrarPonto): Promise<IPonto>{
        // @ts-ignore
        inputRegistrarPonto.status = this.formatarEntradaStatus(inputRegistrarPonto.status);
        const { error, value } = this.validator.validarInputRegistrarPonto(inputRegistrarPonto);
        const validaCpf = this.validator.validarCpf(inputRegistrarPonto.identificadorUnico);


        if(error && !validaCpf) {
            throw new Error('Erro na validacao. Os dados informados sao invalidos.');
        };

        const usuarioEncontrado = await this.usuarioService.buscar({cpf: inputRegistrarPonto.identificadorUnico});

        if(usuarioEncontrado.length <= 0) {throw new Error("Erro na validacao. Os dados informados não possuem registro na base de dados.")};
        
        // @ts-ignore
        const status = StatusPonto[inputRegistrarPonto.status]
        const horario = this.obterHorarioAtualFormatado();
        const data = this.obterDataAtualFormatada();
        const verificaPonto = await this.buscar({identificadorUnico: inputRegistrarPonto.identificadorUnico, data: data});

        if(verificaPonto.length == 1  && verificaPonto[0].status == StatusPonto.DIA_UTIL){
            const entradaConvertida = this.converteStringParaHorasMinutos(verificaPonto[0].horario);
            const saidaConvertida = this.converteStringParaHorasMinutos(horario);

            const pontoMarcado = new Ponto({
                identificadorUnico: inputRegistrarPonto.identificadorUnico,
                data: data,
                horario: horario,
                horasTrabalhadas: this.calculaHorasTrabalhadas(entradaConvertida, saidaConvertida),
                status: status,
                justificativa: inputRegistrarPonto.justificativa ? inputRegistrarPonto.justificativa : Justificativa.SEM_JUSTIFICATIVA,
                marcador: Marcador.SAIDA
            });

            return await pontoMarcado.save();
        } else if(verificaPonto.length == 0 && status == StatusPonto.DIA_UTIL){
            const pontoMarcado = new Ponto({
                identificadorUnico: inputRegistrarPonto.identificadorUnico,
                data: data,
                horario: horario,
                horasTrabalhadas: HorasTrabalhadas.ENTRADA,
                status: status,
                justificativa: inputRegistrarPonto.justificativa ? inputRegistrarPonto.justificativa : Justificativa.SEM_JUSTIFICATIVA,
                marcador: Marcador.ENTRADA
            });

            return await pontoMarcado.save();
        } else if(verificaPonto.length == 0 && status !== StatusPonto.DIA_UTIL) {
            const pontoMarcado = new Ponto({
                identificadorUnico: inputRegistrarPonto.identificadorUnico,
                data: data,
                horario: horario,
                horasTrabalhadas: HorasTrabalhadas.ABONO,
                status: status,
                justificativa: inputRegistrarPonto.justificativa ? inputRegistrarPonto.justificativa : Justificativa.SEM_JUSTIFICATIVA,
                marcador: Marcador.ABONO
            });

            return await pontoMarcado.save();
        } else {
            throw new Error("Erro ao registrar ponto. Verifique seus dados e tente novamente.");
        }
    }

    public async buscar(query: IQueryPonto): Promise<IPonto[]> {
        // @ts-ignore
        if(query.status){query.status = this.formatarEntradaStatus(query.status);}
        // @ts-ignore
        if(query.marcador){query.marcador = query.marcador.toUpperCase()}

        const { error, value } = this.validator.validarQueryPonto(query);
        const validaCpf = query.identificadorUnico? this.validator.validarCpf(query.identificadorUnico) : true;

        if(error && !validaCpf) {
            throw new Error('Erro na validacao. Os dados informados sao invalidos.');
        };

        // @ts-ignore
        if(query.status){query.status = StatusPonto[query.status]};

        // @ts-ignore
        if(query.marcador){query.marcador = Marcador[query.marcador]};

        return await Ponto.find(query);
    }

    public async listar(): Promise<IPonto[]> {
        return await Ponto.find();
    }

    public formatarEntradaStatus(status: string): string {
        return status.toUpperCase().replace(/ /g, "_");
    }

    public converteStringParaHorasMinutos(timeString: string): Date {
        const [hours, minutes] = timeString.split(":").map(Number);
        const now = new Date();
        now.setUTCHours(hours);
        now.setUTCMinutes(minutes);
        now.setUTCSeconds(0);
        return now;
    }

    public calculaHorasTrabalhadas(entrada: Date, saida: Date): string {
        const differenceInMilliseconds = saida.getTime() - entrada.getTime();
        const totalMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        const formattedHours = hours.toString().padStart(2, "0");
        const formattedMinutes = minutes.toString().padStart(2, "0");
        return `${formattedHours}:${formattedMinutes}`;
    }

    public obterHorarioAtualFormatado(): string {
        const dataAtual = new Date();
        const options = { hour: '2-digit', minute: '2-digit' };

        // @ts-ignore
        const horarioFormatado = new Intl.DateTimeFormat('pt-BR', options).format(dataAtual);
        return horarioFormatado;
    }

    public obterDataAtualFormatada(): string {
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        
        return `${dia}/${mes}/${ano}`;
      }   
}
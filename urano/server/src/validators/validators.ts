import { IInputCriarUsuario } from "../models/interfaces/inputCriarUsuario";
import * as Joi from "joi";
import { IQuery } from "../models/interfaces/query";
import { IInputAtualizarUsuario } from "../models/interfaces/inputAtualizarUsuario";
import { IInputAlterarStatusUsuario } from "../models/interfaces/inputAlterarStatusUsuario";
import { IInputAdicionarPeca } from "../models/interfaces/inputAdicionarPeca";
import { IQueryPecas } from "../models/interfaces/queryPecas";
import { IInputTrocarStatusPeca } from "../models/interfaces/inputTrocarStatusPeca";
import { IInputContarPecas } from "../models/interfaces/inputContarPecas";
import { ClassePeca } from "../models/enums/classePeca";
import { IInputAviao } from "../models/interfaces/inputAviao";
import { IInputChamado } from "../models/interfaces/inputChamado";
import { IInputRegistrarPonto } from "../models/interfaces/inputRegistrarPonto";
import { StatusPonto } from "../models/enums/statusPonto";
import { IQueryPonto } from "../models/interfaces/queryPonto";
import { Marcador } from "../models/enums/marcador";

export class Validators {

  //Validators de Usuários
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  telefoneRegex = /^[0-9]+$/;
  nomeRegex = /^[A-Za-z]+$/;
  enumValidoClassePeca = Object.keys(ClassePeca);
  enumValidoStatusPonto = Object.keys(StatusPonto);
  enumValidoMarcadorPonto = Object.keys(Marcador);


  public validarInputCriarUsuario(inputCriarUsuario: IInputCriarUsuario) {
    const bodySchema = Joi.object<IInputCriarUsuario>({
      nome: Joi.string().min(1).max(99).pattern(this.nomeRegex).required(),
      email: Joi.string().pattern(this.emailRegex).required(),
      senha: Joi.string().required(),
      telefone: Joi.string().min(11).max(11).pattern(this.telefoneRegex).required(),
      cargo: Joi.string().min(1).max(50),
      cpf: Joi.string().min(11).max(11).required(),
    });

    return bodySchema.validate(inputCriarUsuario);
  }

  public validarQuery(query: IQuery) {
    const bodySchema = Joi.object<IQuery>({
      id: Joi.string().min(24).max(24),
      cpf: Joi.string().min(11).max(11),
      email: Joi.string().pattern(this.emailRegex),
      cargo: Joi.string().min(1).max(50)
    });

    return bodySchema.validate(query);
  }

  public validarInputAtualizarUsuario(inputAtualizarUsuario: IInputAtualizarUsuario) {
    const bodySchema = Joi.object<IInputAtualizarUsuario>({
      cpf: Joi.string().min(11).max(11).required(),
      nome: Joi.string().min(1).max(99).pattern(this.nomeRegex),
      telefone: Joi.string().min(11).max(11).pattern(this.telefoneRegex),
      email: Joi.string().pattern(this.emailRegex),
      senha: Joi.string(),
      cargo: Joi.string().min(1).max(50),
    });

    return bodySchema.validate(inputAtualizarUsuario);
  }

  public validarInputAlterarStatusUsuario(inputAlterarStatusUsuario: IInputAlterarStatusUsuario) {
    const bodySchema = Joi.object<IInputAlterarStatusUsuario>({
      cpf: Joi.string().min(11).max(11).required(),
    });

    return bodySchema.validate(inputAlterarStatusUsuario);
  }

  public validarCpf(cpf: string) {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(.)\1+$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(9, 10))) {
      return false;
    }

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;

    if (resto === 10 || resto === 11) {
      resto = 0;
    }

    if (resto !== parseInt(cpf.substring(10, 11))) {
      return false;
    }

    return true;
  }

  //Validators de Peças
  public validarInputAdicionarPeca(inputAdicionarPeca: IInputAdicionarPeca) {
    const bodySchema = Joi.object<IInputAdicionarPeca>({
        nome: Joi.string().min(1).max(99).required(),
        codigo: Joi.string().length(5).pattern(/^\d+$/).required(),
        classe: Joi.string().valid(...this.enumValidoClassePeca).required(),
        preco: Joi.string().regex(/^\d+(,\d+)*$/).required(),
    });

    return bodySchema.validate(inputAdicionarPeca);
  }

  public validarQueryPecas(query: IQueryPecas) {
    const bodySchema = Joi.object<IQueryPecas>({
        nome:  Joi.string().min(1).max(99),
        codigo: Joi.string().length(5).pattern(/^\d+$/),
        classe: Joi.string().valid(...this.enumValidoClassePeca),
        preco: Joi.string().regex(/^\d+(,\d+)*$/)
    });

    return bodySchema.validate(query);
  }

  public validarInpuContarPecas(inpuContarPecas: IInputContarPecas) {
    const bodySchema = Joi.object<IInputContarPecas>({
        classe: Joi.string().valid(...this.enumValidoClassePeca).required(),
    });

    return bodySchema.validate(inpuContarPecas);
  }

  public validarInputDesabilitarPeca(inputDesabilitarPeca: IInputTrocarStatusPeca) {
    const bodySchema = Joi.object<IInputTrocarStatusPeca>({
        codigo: Joi.string().length(5).pattern(/^\d+$/).required(),
        classe: Joi.string().valid(...this.enumValidoClassePeca).required(),
    });

    return bodySchema.validate(inputDesabilitarPeca);
  }

  // Validators de Ponto
  public validarInputRegistrarPonto(inputRegistrarPonto: IInputRegistrarPonto) {
    const bodySchema = Joi.object<IInputRegistrarPonto>({
      identificadorUnico: Joi.string().min(11).max(11).required(),
      status: Joi.string().valid(...this.enumValidoStatusPonto).required(),
      justificativa: Joi.string()
    });

    return bodySchema.validate(inputRegistrarPonto);
  }

  public validarQueryPonto(query: IQueryPonto) {
    const bodySchema = Joi.object<IQueryPonto>({
      identificadorUnico: Joi.string().min(11).max(11),
      data: Joi.string(),
      status: Joi.string().valid(...this.enumValidoStatusPonto),
      marcador: Joi.string().valid(...this.enumValidoMarcadorPonto)
    });

    return bodySchema.validate(query);
  }
}

// Validators de aviões
function validarAviao(inputAviao: IInputAviao) {
  const bodySchema = Joi.object<IInputAviao>({
    numeroSerie: Joi.string().required(),
    modelo: Joi.string().required(),
    fabricante: Joi.string().required(),
    anoFabricacao: Joi.number().required(),
    capacidadePassageiros: Joi.number().required(),
    historicoManutencao: Joi.array().items(
      Joi.object({
        tipoManutencao: Joi.string().required(),
        data: Joi.date().required(),
        descricao: Joi.string().required(),
        custo: Joi.number().required(),
      })
    ),
    statusDisponibilidade: Joi.string().valid('Em Serviço', 'Fora de Serviço').required(),
    localizacaoAtual: Joi.string(),
    historicoVoos: Joi.array().items(
      Joi.object({
        destino: Joi.string().required(),
        data: Joi.date().required(),
        duracao: Joi.number().required(),
      })
    ),
    picture: Joi.string().required(),
  });

  return bodySchema.validate(inputAviao);
}

// Validator de Chamados
function validarChamado(inputChamado: IInputChamado){
  const bodySchema = Joi.object<IInputChamado>({
    titulo: Joi.string().required(),
    descricao: Joi.string().required(),
    dataCriacao: Joi.date().optional(),
    dataAtualizacao: Joi.date().optional(),
    status: Joi.string().valid('Backlog', 'Em Andamento', 'Concluído').required(),
    prioridade: Joi.array().items(
      Joi.object({
        tipo: Joi.string().valid('Muito baixa', 'Baixa', 'Média', 'Alta', 'Muito alta').required(),
      })
    ).required(),
    categoria: Joi.string().valid('Manutenção Preventiva', 'Manutenção Corretiva', 'Melhoria').required(),
    solicitante: Joi.array().items(
      Joi.object({
        displayName: Joi.string().required(),
        email: Joi.string().required(),
        ativo: Joi.boolean().required(),
        avatarUrl: Joi.string().required(),
      })
    ),
    responsavel: Joi.array().items(
      Joi.object({
        displayName: Joi.string().required(),
        email: Joi.string().required(),
        ativo: Joi.boolean().required(),
        avatarUrl: Joi.string().required(),
      })
    ),
    estimativa: Joi.number().required(),
    comentarios: Joi.array().items(
      Joi.object({
        comentario: Joi.array().items(
          Joi.object({
            id: Joi.number().required(),
            autor: Joi.array().items(
              Joi.object({
                displayName: Joi.string().required(),
                email: Joi.string().required(),
                ativo: Joi.boolean().required(),
                avatarUrl: Joi.string().required(),
              })
            ),
            dataCriacao: Joi.date().optional(),
            dataAtualizacao: Joi.date().optional(),
            body: Joi.string().required(),
          })
        ),
        maxResults: Joi.number().required(),
        totalResults: Joi.number().required(),
      })
    ),
  });

  return bodySchema.validate(inputChamado);
}

export { validarAviao, validarChamado };
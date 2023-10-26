import { IInputCriarUsuario } from "../models/interfaces/inputCriarUsuario";
import * as Joi from "joi";
import { IQuery } from "../models/interfaces/query";
import { IInputAtualizarUsuario } from "../models/interfaces/inputAtualizarUsuario";
import { IInputAlterarStatusUsuario } from "../models/interfaces/inputAlterarStatusUsuario";

export class Validators {
  static validarAviao(aviaoData: { numeroSerie: any; modelo: any; fabricante: any; anoFabricacao: any; capacidadePassageiros: any; historicoManutencao: any; statusDisponibilidade: any; localizacaoAtual: any; historicoVoos: any; picture: any; }) {
    throw new Error("Method not implemented.");
  }
  emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  telefoneRegex = /^[0-9]+$/;
  nomeRegex = /^[A-Za-z]+$/;

  public validarInputCriarUsuario(inputCriarUsuario: IInputCriarUsuario) {
    const bodySchema = Joi.object<IInputCriarUsuario>({
      nome: Joi.string().min(1).max(99).pattern(this.nomeRegex).required(),
      email: Joi.string().pattern(this.emailRegex).required(),
      telefone: Joi.string().min(11).max(11).pattern(this.telefoneRegex).required(),
      cargo: Joi.string().min(1).max(50),
      cpf: Joi.string().min(11).max(11).required(),
      emailUsuarioLogado: Joi.string().pattern(this.emailRegex).required()
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
      cargo: Joi.string().min(1).max(50),
      emailUsuarioLogado: Joi.string().pattern(this.emailRegex).required()
    });

    return bodySchema.validate(inputAtualizarUsuario);
  }

  public validarInputAlterarStatusUsuario(inputAlterarStatusUsuario: IInputAlterarStatusUsuario) {
    const bodySchema = Joi.object<IInputAlterarStatusUsuario>({
      cpf: Joi.string().min(11).max(11).required(),
      emailUsuarioLogado: Joi.string().pattern(this.emailRegex).required(),
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
}


const validarAviao = (obj: {
  numeroSerie: number,
  modelo: string,
  fabricante: number,
  anoFabricacao: Date,
  capacidadePassageiros: number,
  historicoManutencao: [{
    tipoManutencao: string,
    data: Date,
    descricao: string,
    custo: number,
  }],
  statusDisponibilidade: string,
  localizacaoAtual: string,
  historicoVoos: [{
    destino: string,
    data: Date,
    duracao: number,
  }],
  picture: string,
}) => {
  const AviaoSchema = Joi.object({
    numeroSerie: Joi.number().required(),
    modelo: Joi.string().required(),
    fabricante: Joi.number().required(),
    anoFabricacao: Joi.date().required(),
    capacidadePassageiros: Joi.number().required(),
    historicoManutencao: Joi.array().items(Joi.object({
      tipoManutencao: Joi.string().required(),
      data: Joi.date().required(),
      descricao: Joi.string().required(),
      custo: Joi.number().required(),
    })).required(),
    statusDisponibilidade: Joi.string().required(),
    localizacaoAtual: Joi.string().required(),
    historicoVoos: Joi.array().items(Joi.object({
      destino: Joi.string().required(),
      data: Joi.date().required(),
      duracao: Joi.number().required(),
    })).required(),
    picture: Joi.string().required(),
  }).validate(obj);

  if (AviaoSchema.error instanceof Error) {
    throw new Error(AviaoSchema.error.message);
  }

  return AviaoSchema.value;
}

export { validarAviao }
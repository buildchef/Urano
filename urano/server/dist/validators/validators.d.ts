import { IInputCriarUsuario } from "../models/interfaces/inputCriarUsuario";
import * as Joi from "joi";
import { IQuery } from "../models/interfaces/query";
import { IInputAtualizarUsuario } from "../models/interfaces/inputAtualizarUsuario";
import { IInputAlterarStatusUsuario } from "../models/interfaces/inputAlterarStatusUsuario";
export declare class Validators {
    emailRegex: RegExp;
    telefoneRegex: RegExp;
    nomeRegex: RegExp;
    validarInputCriarUsuario(inputCriarUsuario: IInputCriarUsuario): Joi.ValidationResult<IInputCriarUsuario>;
    validarQuery(query: IQuery): Joi.ValidationResult<IQuery>;
    validarInputAtualizarUsuario(inputAtualizarUsuario: IInputAtualizarUsuario): Joi.ValidationResult<IInputAtualizarUsuario>;
    validarInputAlterarStatusUsuario(inputAlterarStatusUsuario: IInputAlterarStatusUsuario): Joi.ValidationResult<IInputAlterarStatusUsuario>;
    validarCpf(cpf: string): boolean;
}

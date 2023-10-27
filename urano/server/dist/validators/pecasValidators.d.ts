import * as Joi from "joi";
import { IInputAdicionarPeca } from "../models/interfaces/inputAdicionarPeca";
import { IQueryPecas } from "../models/interfaces/queryPecas";
import { IInputTrocarStatusPeca } from "../models/interfaces/inputTrocarStatusPeca";
import { IInputContarPecas } from "../models/interfaces/inputContarPecas";
export declare class PecasValidators {
    emailRegex: RegExp;
    validarInputAdicionarPeca(inputAdicionarPeca: IInputAdicionarPeca): Joi.ValidationResult<IInputAdicionarPeca>;
    validarQueryPecas(query: IQueryPecas): Joi.ValidationResult<IQueryPecas>;
    validarInpuContarPecas(inpuContarPecas: IInputContarPecas): Joi.ValidationResult<IInputContarPecas>;
    validarInputDesabilitarPeca(inputDesabilitarPeca: IInputTrocarStatusPeca): Joi.ValidationResult<IInputTrocarStatusPeca>;
}

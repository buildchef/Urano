import * as Joi from "joi";
import { IInputAdicionarPeca } from "../models/interfaces/inputAdicionarPeca";
import { IQueryPecas } from "../models/interfaces/queryPecas";
import { IInputTrocarStatusPeca } from "../models/interfaces/inputTrocarStatusPeca";
import { IInputContarPecas } from "../models/interfaces/inputContarPecas";
import { ClassePeca } from "../models/enums/classePeca";

export class PecasValidators {
    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    enumValido = Object.keys(ClassePeca);

    public validarInputAdicionarPeca(inputAdicionarPeca: IInputAdicionarPeca) {
        const bodySchema = Joi.object<IInputAdicionarPeca>({
            emailUsuarioLogado: Joi.string().pattern(this.emailRegex).required(),
            nome: Joi.string().min(1).max(99).required(),
            codigo: Joi.string().length(5).pattern(/^\d+$/).required(),
            classe: Joi.string().valid(...this.enumValido).required(),
            preco: Joi.string().regex(/^\d+(,\d+)*$/).required(),
        });

        return bodySchema.validate(inputAdicionarPeca);
    }

    public validarQueryPecas(query: IQueryPecas) {
        const bodySchema = Joi.object<IQueryPecas>({
            nome:  Joi.string().min(1).max(99),
            codigo: Joi.string().length(5).pattern(/^\d+$/),
            classe: Joi.string().valid(...this.enumValido),
            preco: Joi.string().regex(/^\d+(,\d+)*$/)
        });

        return bodySchema.validate(query);
    }

    public validarInpuContarPecas(inpuContarPecas: IInputContarPecas) {
        const bodySchema = Joi.object<IInputContarPecas>({
            classe: Joi.string().valid(...this.enumValido).required(),
        });

        return bodySchema.validate(inpuContarPecas);
    }

    public validarInputDesabilitarPeca(inputDesabilitarPeca: IInputTrocarStatusPeca) {
        const bodySchema = Joi.object<IInputTrocarStatusPeca>({
            emailUsuarioLogado: Joi.string().pattern(this.emailRegex).required(), 
            codigo: Joi.string().length(5).pattern(/^\d+$/).required(),
            classe: Joi.string().valid(...this.enumValido).required(),
        });

        return bodySchema.validate(inputDesabilitarPeca);
    }
}
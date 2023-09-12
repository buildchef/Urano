import { IInputCriarUsuario } from "../models/interfaces/inputCriarUsuario";
import * as Joi from "joi";
import { IQuery } from "../models/interfaces/query";
import { IInputAtualizarUsuario } from "../models/interfaces/inputAtualizarUsuario";
import { IInputAlterarStatusUsuario } from "../models/interfaces/inputAlterarStatusUsuario";

export class Validators{
    emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    telefoneRegex = /^[0-9]+$/;
    nomeRegex = /^[A-Za-z]+$/;

    public validarInputCriarUsuario(inputCriarUsuario: IInputCriarUsuario){
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

    public validarQuery(query: IQuery){
        const bodySchema = Joi.object<IQuery>({
            id: Joi.string().min(24).max(24),
            cpf: Joi.string().min(11).max(11),
            email: Joi.string().pattern(this.emailRegex),
            cargo: Joi.string().min(1).max(50)
        });

        return bodySchema.validate(query);
    }

    public validarInputAtualizarUsuario(inputAtualizarUsuario: IInputAtualizarUsuario){
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

    public validarInputAlterarStatusUsuario(inputAlterarStatusUsuario: IInputAlterarStatusUsuario){
        const bodySchema = Joi.object<IInputAlterarStatusUsuario>({
            cpf: Joi.string().min(11).max(11).required(),
            emailUsuarioLogado: Joi.string().pattern(this.emailRegex).required(),
        });

        return bodySchema.validate(inputAlterarStatusUsuario);
    }
}
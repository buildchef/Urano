"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PecasValidators = void 0;
const Joi = __importStar(require("joi"));
const classePeca_1 = require("../models/enums/classePeca");
class PecasValidators {
    constructor() {
        this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        this.enumValido = Object.keys(classePeca_1.ClassePeca);
    }
    validarInputAdicionarPeca(inputAdicionarPeca) {
        const bodySchema = Joi.object({
            emailUsuarioLogado: Joi.string().pattern(this.emailRegex).required(),
            nome: Joi.string().min(1).max(99).required(),
            codigo: Joi.string().length(5).pattern(/^\d+$/).required(),
            classe: Joi.string().valid(...this.enumValido).required(),
            preco: Joi.string().regex(/^\d+(,\d+)*$/).required(),
        });
        return bodySchema.validate(inputAdicionarPeca);
    }
    validarQueryPecas(query) {
        const bodySchema = Joi.object({
            nome: Joi.string().min(1).max(99),
            codigo: Joi.string().length(5).pattern(/^\d+$/),
            classe: Joi.string().valid(...this.enumValido),
            preco: Joi.string().regex(/^\d+(,\d+)*$/)
        });
        return bodySchema.validate(query);
    }
    validarInpuContarPecas(inpuContarPecas) {
        const bodySchema = Joi.object({
            classe: Joi.string().valid(...this.enumValido).required(),
        });
        return bodySchema.validate(inpuContarPecas);
    }
    validarInputDesabilitarPeca(inputDesabilitarPeca) {
        const bodySchema = Joi.object({
            emailUsuarioLogado: Joi.string().pattern(this.emailRegex).required(),
            codigo: Joi.string().length(5).pattern(/^\d+$/).required(),
            classe: Joi.string().valid(...this.enumValido).required(),
        });
        return bodySchema.validate(inputDesabilitarPeca);
    }
}
exports.PecasValidators = PecasValidators;
//# sourceMappingURL=pecasValidators.js.map
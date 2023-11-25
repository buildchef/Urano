import { Request, Response } from "express";
import Chamado from "../models/chamadoModel";
import { validarChamado } from "../validators/validators";
import { generateRandomNumericString } from "../utils/utils";

export const chamadoController = {
    // GET /chamado
    index: async (req: Request, res: Response) => {
        try {
            const chamado = await Chamado.find();
            return res.json(chamado);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ error: error.message });
            }
        }
    },

    // POST /chamado
    save: async (req: Request, res: Response) => {
        const {
            titulo,
            descricao,
            dataCriacao = new Date(),
            dataAtualizacao = new Date(),
            status,
            prioridade,
            categoria,
            solicitante,
            responsavel
        } = req.body

        try {
            const chamadoData = {
                titulo,
                codigo: generateRandomNumericString(),
                descricao,
                dataCriacao,
                dataAtualizacao,
                status,
                prioridade,
                categoria,
                solicitante,
                responsavel,
            }

            const chamado = validarChamado(chamadoData);
            const createdChamado = await Chamado.create(chamado.value);

            return res.status(201).send(createdChamado);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ error: error.message });
            }
        }
    },

    // GET /chamado/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const chamado = await Chamado.findById(id);
            return res.json(chamado);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ error: error.message });
            }
        }
    },

    // PUT /chamado/:id
    update: async (req: Request, res: Response) => {
        const { id } = req.params;
        const {
            titulo,
            codigo,
            descricao,
            dataCriacao,
            dataAtualizacao = new Date(),
            status,
            prioridade,
            categoria,
            solicitante,
            responsavel,
        } = req.body

        try {
            const chamadoData = {
                titulo,
                codigo,
                descricao,
                dataCriacao,
                dataAtualizacao,
                status,
                prioridade,
                categoria,
                solicitante,
                responsavel,
            }

            const chamado = validarChamado(chamadoData);
            const updatedChamado = await Chamado.findByIdAndUpdate(id, chamado.value, { new: true });

            return res.json(updatedChamado);
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ error: error.message });
            }
        }
    },

    // DELETE /chamado/:id
    delete: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            await Chamado.findByIdAndDelete(id);
            return res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send({ error: error.message });
            }
        }
    },
};
import { Request, Response } from "express";
import Aviao from "../models/aviaoModel";
import { validarAviao } from "../validators/validators";

export const aviaoController = {

    // GET /aviao
    index: async (req: Request, res: Response) => {
        try {
            const aviao = await Aviao.find();
            return res.json(aviao);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).send({ error: err.message });
            }
        }
    },
    // POST /aviao
    save: async (req: Request, res: Response) => {
        const {
            numeroSerie,
            modelo,
            fabricante,
            anoFabricacao,
            capacidadePassageiros,
            historicoManutencao,
            statusDisponibilidade,
            localizacaoAtual,
            historicoVoos,
            picture
        } = req.body;

        try {
            const aviaoData = {
                numeroSerie,
                modelo,
                fabricante,
                anoFabricacao,
                capacidadePassageiros,
                historicoManutencao,
                statusDisponibilidade,
                localizacaoAtual,
                historicoVoos,
                picture
            };

            const aviao = validarAviao(aviaoData);
            const createdAviao = await Aviao.create(aviao.value);

            return res.status(201).send(createdAviao);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).send({ error: err.message });
            }
        }
    },
    // GET /aviao/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const aviao = await Aviao.findById(id);
            return res.json(aviao);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).send({ error: err.message });
            }
        }
    },
    // PUT /aviao/:id
    update: async (req: Request, res: Response) => {
        const { id } = req.params;

        const {
            numeroSerie,
            modelo,
            fabricante,
            anoFabricacao,
            capacidadePassageiros,
            historicoManutencao,
            statusDisponibilidade,
            localizacaoAtual,
            historicoVoos,
            picture
        } = req.body;

        try {
            const aviaoData = {
                numeroSerie,
                modelo,
                fabricante,
                anoFabricacao,
                capacidadePassageiros,
                historicoManutencao,
                statusDisponibilidade,
                localizacaoAtual,
                historicoVoos,
                picture
            };

            const aviao = validarAviao(aviaoData);
        
            const updatedAviao = await Aviao.findByIdAndUpdate(id, aviao.value, { new: true })


            return res.status(200).send(updatedAviao);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).send({ error: err.message });
            }
        }
    },
    // DELETE /aviao/:id
    delete: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            await Aviao.findByIdAndDelete(id);
            return res.status(204).send(`Sucesso ao deletar o avião com id ${id}`);
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).send({ error: err.message });
            }
        }
    },
};

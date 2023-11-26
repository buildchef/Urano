import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'Token não fornecido. Acesso não autorizado.' });
    }

    try {
        const verified = jwt.verify(token, 'passwordKey') as { id: string };

        if (!verified) {
            return res.status(401).json({ msg: 'Token inválido. Acesso não autorizado.' });
        }

        req.body.user = verified.id;
        req.body.token = token;
        next();
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

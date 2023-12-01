import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorization');

    if (!token || typeof token !== 'string') {
        return res.status(401).json({ message: 'Token not found' });
    }

    try {
        const decoded = jwt.verify(token, secretKey as Secret);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalid' });
    }
};

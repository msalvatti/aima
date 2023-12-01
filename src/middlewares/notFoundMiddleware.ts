import { Request, Response, NextFunction } from 'express';

export const notFoundMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errorMessage = '404 Not Found.';

    res.status(404).json({ error: errorMessage });
};
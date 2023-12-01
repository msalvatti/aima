import { Request, Response, NextFunction } from 'express';

interface HttpError extends Error {
    response?: {
        status?: number;
        data?: any;
    };
}

export const errorMiddleware = (
    err: HttpError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof Error) {
        console.error(err.stack);

        if (err.response) {
            return res.status(err.response.status || 500).json(err.response.data || 'Internal Server Error');
        }

        return res.status(500).json(err.message || 'Internal Server Error');
    }
};

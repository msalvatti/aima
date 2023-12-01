import { Request, Response } from 'express';

export const getAllProducts = (req: Request, res: Response): void => {
  const message = 'products';
  res.json({ message });
};

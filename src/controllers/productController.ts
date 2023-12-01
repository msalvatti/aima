import { Request, Response } from 'express';

import Product from '../models/product';

const handleError = (res: Response, errorMessage: string, error?: unknown): void => {
  if (error instanceof Error) {
    console.error(errorMessage, error);
    res.status(500).send(`
    500 Internal Server Error.
    Something went wrong while processing the request. 
    Error: ${error.message}`);
  } else {
    console.error(errorMessage);
    res.status(500).send(`
    500 Internal Server Error. 
    Something went wrong while processing the request.`);
  }
};

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.findAll({
      order: [['id', 'ASC']],
    });

    res.json({ products });
  } catch (error) {
    handleError(res, 'Error fetching products:', error);
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId: number = parseInt(req.params.id, 10);

    const product = await Product.findByPk(productId);

    if (product) {
      res.json({ product });
    } else {
      res.status(404).json({ message: 'Product not found.' });
    }
  } catch (error) {
    handleError(res, 'Error fetching products:', error);
  }
};

export const insertProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, price, quantity } = req.body;

    const newProduct = await Product.create({
      name,
      price,
      quantity,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(newProduct);
  } catch (error) {
    handleError(res, 'Error fetching products:', error);
  }
};

export const updateProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId: number = parseInt(req.params.id, 10);

    const existingProduct = await Product.findByPk(productId);

    if (!existingProduct) {
      res.status(404).json({ error: 'Product not found.' });
      return;
    }

    await existingProduct.update(req.body);

    res.json({ message: 'Product updated successfully.' });
  } catch (error) {
    handleError(res, 'Error fetching products:', error);
  }
};

export const deleteProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId: number = parseInt(req.params.id, 10);

    const existingProduct = await Product.findByPk(productId);

    if (!existingProduct) {
      res.status(404).json({ error: 'Product not found.' });
      return;
    }

    await existingProduct.destroy();

    res.status(204).send();
  } catch (error) {
    handleError(res, 'Error fetching products:', error);
  }
};
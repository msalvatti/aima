import { Request, Response } from 'express';

import Product from '../models/product';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.findAll();

    res.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).send('500 Internal Server Error');
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
    console.error('Error fetching products:', error);
    res.status(500).send('500 Internal Server Error');
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
    console.error('Error fetching products:', error);
    res.status(500).send('500 Internal Server Error');
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
    console.error('Error fetching products:', error);
    res.status(500).send('500 Internal Server Error');
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
    console.error('Error fetching products:', error);
    res.status(500).send('500 Internal Server Error');
  }
};
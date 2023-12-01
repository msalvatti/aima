import { Request, Response } from 'express';
import { Transaction } from 'sequelize';

import Sale from '../models/sale';
import Product from '../models/product';
import Supplier from '../models/supplier';
import { sequelize } from '../connection';

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

export const getAllSales = async (req: Request, res: Response): Promise<void> => {
  try {
    const sales = await Sale.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'name'],
          as: 'product',
        },
        {
          model: Supplier,
          attributes: ['id', 'name'],
          as: 'supplier',
        },
      ],
      attributes: { exclude: ['productId', 'supplierId'] },
      order: [['createdAt', 'DESC']]
    });

    res.json({ sales });
  } catch (error) {
    handleError(res, 'Error fetching sales:', error);
  }
};

export const getSaleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const saleId: number = parseInt(req.params.id, 10);

    const sale = await Sale.findByPk(saleId, {
      include: [
        {
          model: Product,
          attributes: ['id', 'name'],
          as: 'product',
        },
        {
          model: Supplier,
          attributes: ['id', 'name'],
          as: 'supplier',
        },
      ],
      attributes: { exclude: ['productId', 'supplierId'] },
    });

    if (sale) {
      res.json({ sale });
    } else {
      res.status(404).json({ message: 'Sale not found.' });
    }
  } catch (error) {
    handleError(res, 'Error fetching sales:', error);
  }
};

export const insertSale = async (req: Request, res: Response): Promise<void> => {
  const t: Transaction = await sequelize.transaction();

  try {
    const { total, productId, supplierId } = req.body;

    const product = await Product.findByPk(productId, { transaction: t });
    if (!product) {
      await t.rollback();
      res.status(400).json({ error: 'Product not found.' });
      return;
    }

    const supplier = await Supplier.findByPk(supplierId, { transaction: t });
    if (!supplier) {
      await t.rollback();
      res.status(400).json({ error: 'Supplier not found.' });
      return;
    }

    const newSale = await Sale.create(
      {
        date: new Date(),
        total,
        productId,
        supplierId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { transaction: t }
    );

    await t.commit();

    res.status(201).json(newSale);
  } catch (error) {
    await t.rollback();
    handleError(res, 'Error fetching sales:', error);
  }
};

export const updateSaleById = async (req: Request, res: Response): Promise<void> => {
  const t: Transaction = await sequelize.transaction();

  try {
    const saleId: number = parseInt(req.params.id, 10);

    const existingSale = await Sale.findByPk(saleId);

    if (!existingSale) {
      res.status(404).json({ error: 'Sale not found.' });
      return;
    }

    const { total, productId, supplierId } = req.body;

    if (productId) {
      const productExists = await Product.findOne({
        where: { id: productId },
        transaction: t,
      });

      if (!productExists) {
        await t.rollback();
        res.status(400).json({ error: 'Product not found.' });
        return;
      }
    }

    if (supplierId) {
      const supplierExists = await Supplier.findOne({
        where: { id: supplierId },
        transaction: t,
      });

      if (!supplierExists) {
        await t.rollback();
        res.status(400).json({ error: 'Supplier not found.' });
        return;
      }
    }

    await existingSale.update(req.body);

    await t.commit();

    res.json({ message: 'Sale updated successfully.' });
  } catch (error) {
    await t.rollback();
    handleError(res, 'Error fetching sales:', error);
  }
};

export const deleteSaleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const saleId: number = parseInt(req.params.id, 10);

    const existingSale = await Sale.findByPk(saleId);

    if (!existingSale) {
      res.status(404).json({ error: 'Sale not found.' });
      return;
    }

    await existingSale.destroy();

    res.status(204).send();
  } catch (error) {
    handleError(res, 'Error fetching sales:', error);
  }
};
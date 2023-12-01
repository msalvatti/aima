import { Request, Response } from 'express';

import Supplier from '../models/supplier';

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

export const getAllSuppliers = async (req: Request, res: Response): Promise<void> => {
  try {
    const suppliers = await Supplier.findAll({
      order: [['id', 'ASC']],
    });

    res.json({ suppliers });
  } catch (error) {
    handleError(res, 'Error fetching suppliers:', error);
  }
};

export const getSupplierById = async (req: Request, res: Response): Promise<void> => {
  try {
    const supplierId: number = parseInt(req.params.id, 10);

    const supplier = await Supplier.findByPk(supplierId);

    if (supplier) {
      res.json({ supplier });
    } else {
      res.status(404).json({ message: 'Supplier not found.' });
    }
  } catch (error) {
    handleError(res, 'Error fetching suppliers:', error);
  }
};

export const insertSupplier = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, contactPerson, email } = req.body;

    const newSupplier = await Supplier.create({
      name,
      contactPerson,
      email,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(newSupplier);
  } catch (error) {
    handleError(res, 'Error fetching suppliers:', error);
  }
};

export const updateSupplierById = async (req: Request, res: Response): Promise<void> => {
  try {
    const supplierId: number = parseInt(req.params.id, 10);

    const existingSupplier = await Supplier.findByPk(supplierId);

    if (!existingSupplier) {
      res.status(404).json({ error: 'Supplier not found.' });
      return;
    }

    await existingSupplier.update(req.body);

    res.json({ message: 'Supplier updated successfully.' });
  } catch (error) {
    handleError(res, 'Error fetching suppliers:', error);
  }
};

export const deleteSupplierById = async (req: Request, res: Response): Promise<void> => {
  try {
    const supplierId: number = parseInt(req.params.id, 10);

    const existingSupplier = await Supplier.findByPk(supplierId);

    if (!existingSupplier) {
      res.status(404).json({ error: 'Supplier not found.' });
      return;
    }

    await existingSupplier.destroy();

    res.status(204).send();
  } catch (error) {
    handleError(res, 'Error fetching suppliers:', error);
  }
};
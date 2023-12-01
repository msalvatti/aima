import express, { Router } from 'express';
import { getAllSuppliers, getSupplierById, insertSupplier, updateSupplierById, deleteSupplierById } from '../controllers/supplierController';

const router: Router = express.Router();

router.get('/', getAllSuppliers);

router.post('/', insertSupplier);

router.get('/:id', getSupplierById);

router.put('/:id', updateSupplierById);

router.delete('/:id', deleteSupplierById);

export = router;

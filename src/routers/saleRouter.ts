import express, { Router } from 'express';
import { getAllSales, getSaleById, insertSale, updateSaleById, deleteSaleById } from '../controllers/saleController';

const router: Router = express.Router();

router.get('/', getAllSales);

router.post('/', insertSale);

router.get('/:id', getSaleById);

router.put('/:id', updateSaleById);

router.delete('/:id', deleteSaleById);

export = router;

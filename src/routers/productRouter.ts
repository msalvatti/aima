import express, { Router } from 'express';
import { getAllProducts, getProductById, insertProduct, updateProductById, deleteProductById } from '../controllers/productController';

const router: Router = express.Router();

router.get('/', getAllProducts);

router.post('/', insertProduct);

router.get('/:id', getProductById);

router.put('/:id', updateProductById);

router.delete('/:id', deleteProductById);

export = router;

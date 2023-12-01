import express, { Router } from 'express';
import { getAllProducts } from '../controllers/productController';

const router: Router = express.Router();

router.get('/', getAllProducts);

export = router;

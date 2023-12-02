import express, { Router } from 'express';
import { getRestockReport } from '../controllers/reportController';

const router: Router = express.Router();

router.get('/:minimumStockThreshold', getRestockReport);

export = router;

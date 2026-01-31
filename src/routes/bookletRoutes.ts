import express from 'express';
import { getAllBooklets, purchaseBooklet } from '../controllers/bookletController.ts';

const router = express.Router();

// GET /api/booklets → list all booklets
router.get('/', getAllBooklets);

// POST /api/booklets/purchase → purchase booklet
router.post('/purchase', purchaseBooklet);

export default router;

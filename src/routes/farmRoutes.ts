import express from 'express';
import { getFarmerFarms, createFarm } from '../controllers/farmController.ts';
import { checkAdmin } from '../middleware/authMiddleware.ts';

const router = express.Router();

// GET /api/farms/:userId → get all farms of a farmer
router.get('/:userId', getFarmerFarms);

// POST /api/farms/ → create farm (admin only)
router.post('/', checkAdmin, createFarm);

export default router;

import express from 'express';
import {
  getAllEquipment,
  createEquipment,
  submitRentalRequest,
} from '../controllers/equipmentController.ts';
import { checkAdmin } from '../middleware/authMiddleware.ts';

const router = express.Router();

// GET /api/equipment → list all equipment
router.get('/', getAllEquipment);

// POST /api/equipment → create equipment (admin only)
router.post('/', checkAdmin, createEquipment);

// POST /api/equipment/rent → submit rental request
router.post('/rent', submitRentalRequest);

export default router;

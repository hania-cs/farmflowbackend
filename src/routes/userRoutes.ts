import express from 'express';
import { getAllUsers, approveFarmer } from '../controllers/userController.ts';
import { checkAdmin } from '../middleware/authMiddleware.ts';

const router = express.Router();

// GET /api/users/ → get all users (admin only)
router.get('/', checkAdmin, getAllUsers);

// PUT /api/users/approve/:userId → approve farmer (admin only)
router.put('/approve/:userId', checkAdmin, approveFarmer);

export default router;

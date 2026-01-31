import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/db.js';

/**
 * Middleware to check if user is an admin
 * Expects `user_id` in req.body or req.query
 */
export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.user_id || req.query.user_id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    next();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * Middleware to check if farmer is approved
 * Expects `user_id` in req.body or req.query
 */
export const checkFarmerApproved = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.body.user_id || req.query.user_id;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role !== 'farmer') {
      return res.status(403).json({ message: 'Farmer access required' });
    }

    if (!user.is_approved) {
      return res.status(403).json({ message: 'Farmer account not approved yet' });
    }

    next();
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

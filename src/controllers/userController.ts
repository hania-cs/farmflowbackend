import express, { type Request, type Response } from 'express';
import { supabase } from '../config/db.ts';

// Get all users
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('users').select('*');

    if (error) throw error;

    res.json({ users: data });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Approve farmer
export const approveFarmer = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from('users')
      .update({ is_approved: true })
      .eq('id', userId);

    if (error) throw error;

    res.json({ message: 'Farmer approved successfully', user: data[0] });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

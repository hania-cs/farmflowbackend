import express, { type Request, type Response } from 'express';
import { supabase } from '../config/db.ts';

// List all equipment
export const getAllEquipment = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('equipment').select('*');
    if (error) throw error;
    res.json({ equipment: data });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Create equipment
export const createEquipment = async (req: Request, res: Response) => {
  try {
    const { name, description, daily_rate, quantity } = req.body;
    const { data, error } = await supabase.from('equipment').insert([
      { name, description, daily_rate, quantity },
    ]);
    if (error) throw error;
    res.status(201).json({ message: 'Equipment created', equipment: data[0] });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Submit rental request
export const submitRentalRequest = async (req: Request, res: Response) => {
  try {
    const { user_id, equipment_id, quantity, start_date, end_date } = req.body;

    const { data, error } = await supabase.from('equipment_rentals').insert([
      { user_id, equipment_id, quantity, start_date, end_date, status: 'pending' },
    ]);

    if (error) throw error;

    res.status(201).json({ message: 'Rental request submitted', rental: data[0] });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

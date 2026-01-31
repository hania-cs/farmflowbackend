import express, { type Request, type Response } from 'express';
import { supabase } from '../config/db.ts';

// Get farms for a farmer
export const getFarmerFarms = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const { data, error } = await supabase
      .from('farms')
      .select('*')
      .eq('user_id', userId);

    if (error) throw error;

    res.json({ farms: data });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Admin: Create farm
export const createFarm = async (req: Request, res: Response) => {
  try {
    const { user_id, farm_name, area_hectares, last_year_income, income_status } = req.body;

    const { data, error } = await supabase.from('farms').insert([
      { user_id, farm_name, area_hectares, last_year_income, income_status },
    ]);

    if (error) throw error;

    res.status(201).json({ message: 'Farm created successfully', farm: data[0] });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

import express, { type Request, type Response } from 'express';
import { supabase } from '../config/db.ts';

// Get all booklets
export const getAllBooklets = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('booklets').select('*');
    if (error) throw error;
    res.json({ booklets: data });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Purchase booklet
export const purchaseBooklet = async (req: Request, res: Response) => {
  try {
    const { user_id, booklet_id } = req.body;

    const { data, error } = await supabase.from('booklet_purchases').insert([
      { user_id, booklet_id },
    ]);

    if (error) throw error;

    res.status(201).json({ message: 'Booklet purchased', purchase: data[0] });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

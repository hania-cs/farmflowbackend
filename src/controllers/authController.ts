import express, { type Request, type Response } from 'express';
import { supabase } from '../config/db.ts';

// Signup (Admin or Farmer)
export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const isApproved = role === 'admin' ? true : false; // admin auto-approved

    const { data, error } = await supabase.from('users').insert([
      { name, email, password, role, is_approved: isApproved },
    ]);

    if (error) throw error;

    res.status(201).json({ message: 'User registered successfully', user: data[0] });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// Login (Admin or Farmer)
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    if (error || !user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (user.role === 'farmer' && !user.is_approved) {
      return res.status(403).json({ message: 'Farmer account not approved yet' });
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        is_approved: user.is_approved,
      },
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

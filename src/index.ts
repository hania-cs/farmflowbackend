import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// Routes
import authRoutes from './routes/authRoutes';
import farmRoutes from './routes/farmRoutes';
import equipmentRoutes from './routes/equipmentRoutes';
import userRoutes from './routes/userRoutes';
import bookletRoutes from './routes/bookletRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/farms', farmRoutes);
app.use('/api/equipment', equipmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/booklets', bookletRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Farming System Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

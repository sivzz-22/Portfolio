import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database (resilient: non-blocking)
connectDB();

// API Routes
app.use('/api/contact', contactRoutes);

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    message: 'Spider-Man Portfolio Backend Service is Operational',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🕷️  Spider-Man Portfolio Server running on port ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});

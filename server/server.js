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

// Welcome / Root Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    service: "Siva Saravana Kumar's Portfolio Backend API",
    healthCheck: '/api/health',
    contactEndpoint: '/api/contact',
  });
});

// Health Check Route
app.get('/api/health', (req, res) => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS || process.env.GMAIL_APP_PASSWORD;
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    message: 'Spider-Man Portfolio Backend Service is Operational',
    emailConfigured: !!(emailUser && emailPass),
    emailAccount: emailUser ? emailUser.replace(/(.{2})(.*)(@.*)/, '$1***$3') : 'NOT_CONFIGURED',
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🕷️  Spider-Man Portfolio Server running on port ${PORT}`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});

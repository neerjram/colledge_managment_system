import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './config/database.js';

// Import routes
import studentsRoutes from './routes/studentsRoutes.js';
import facultyRoutes from './routes/facultyRoutes.js';
import coursesRoutes from './routes/coursesRoutes.js';
import departmentsRoutes from './routes/departmentsRoutes.js';
// import dashboardRoutes from './routes/dashboardRoutes.js';
// import enrollmentsRoutes from './routes/enrollmentsRoutes.js';
// import reportsRoutes from './routes/reportsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Test database connection on startup
testConnection();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'College Management System API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/students', studentsRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/departments', departmentsRoutes);
// app.use('/api/dashboard', dashboardRoutes);
// app.use('/api/enrollments', enrollmentsRoutes);
// app.use('/api/reports', reportsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not Found', 
    message: `Route ${req.method} ${req.path} not found` 
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});


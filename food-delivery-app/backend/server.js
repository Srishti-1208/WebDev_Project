const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/resources', require('./routes/resources'));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🎓 Welcome to EduAid API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      resources: '/api/resources'
    }
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Server Error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║   🎓 EduAid Backend Server            ║
║                                       ║
║   🚀 Server running on port ${PORT}      ║
║   🗄️  Database: Connected              ║
║   📡 API: http://localhost:${PORT}      ║
║                                       ║
╚═══════════════════════════════════════╝
  `);
});
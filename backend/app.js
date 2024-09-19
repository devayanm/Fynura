const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');
const paymentRoutes = require('./routes/paymentRoutes');
const mentorshipRoutes = require('./routes/mentorshipRoutes');


const app = express();

connectDB();

app.use(express.json());
app.use(cors({
    origin: '*',
  }));
  
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/mentorship', mentorshipRoutes)

app.use(errorMiddleware);

module.exports = app;

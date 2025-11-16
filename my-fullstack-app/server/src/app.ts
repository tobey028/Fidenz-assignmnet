import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import weatherRoutes from './routes/weatherRoutes';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/weather', weatherRoutes);

app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  });
});

AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected');
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 API endpoints:`);
      console.log(`   - Auth: http://localhost:${PORT}/api/auth`);
      console.log(`   - Tasks: http://localhost:${PORT}/api/tasks`);
      console.log(`   - Weather: http://localhost:${PORT}/api/weather`);
    });
  })
  .catch((error) => {
    console.error('❌ Database connection error:', error);
  });

export default app;
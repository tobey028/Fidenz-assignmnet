import { Router, Request, Response } from 'express';
import { getWeatherByCityId } from '../services/weatherService';

const router = Router();

router.get('/weather', async (req: Request, res: Response) => {
  try {
    const { cityId } = req.query;

    if (!cityId || typeof cityId !== 'string') {
      return res.status(400).json({ 
        error: 'Missing or invalid cityId parameter' 
      });
    }

    const weather = await getWeatherByCityId(cityId);
    
    res.json(weather);
  } catch (error: any) {
    console.error('Error fetching weather:', error);

    if (error.message === 'City not found') {
      return res.status(404).json({ error: 'City not found' });
    }

    res.status(500).json({ 
      error: 'Failed to fetch weather data',
      message: error.message 
    });
  }
});

export default router;
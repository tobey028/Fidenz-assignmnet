import { Router } from 'express';
import IndexController from '../controllers';

const router = Router();
const indexController = new IndexController();

export const setRoutes = (app: any) => {
    app.use('/api', router);
    router.get('/', indexController.index);
   
};
import { Router } from 'express';
import dashboardsController from '../controllers/dashboardsController';
import chartsController from '../controllers/chartsController';

const router = Router();

router.get('/dashboards', dashboardsController.getDashboards);
router.get('/charts', chartsController.getCharts);
router.get('/charts/:id', chartsController.getChartData);


export default router;

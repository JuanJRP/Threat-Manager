import { Router } from 'express';
import { ThreathController } from './threats.controllers';

const router = Router();
const threathController = new ThreathController();

router.post('/threath', threathController.createThreath);
router.get('/threath', threathController.getAllThreath);
router.get('/threath/:id', threathController.GetThreathById);
router.get('/threath/name/:name', threathController.GetThreathByName);
router.put('/threath/:id', threathController.UpdateThreathById);
router.delete('/threath/:id', threathController.DeleteThreathById);
router.delete('/deletethreaths', threathController.DeleteManyThreathById);

export default router;

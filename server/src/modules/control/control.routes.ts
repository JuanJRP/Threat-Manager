import { Router } from 'express';
import {
    createControl,
    importControls,
    getControls,
    updateControl,
    deleteControl,
    deleteControls,
} from './control.controllers';

const router = Router();

router.post('/', createControl);
router.post('/import', importControls);
router.get('/', getControls);
router.put('/:id', updateControl);
router.delete('/:id', deleteControl);
router.delete('/', deleteControls);

export default router;

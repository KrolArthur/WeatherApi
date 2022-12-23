import express from 'express';
import { authenticateJWT } from '../jwt_handler.js';

import { 
    getMeasurments, 
    createMeasurment, 
    getMeasurment, 
    deleteMeasurment } from '../controllers/measurements_controller.js';

const router = express.Router();

router.get('/', authenticateJWT, getMeasurments);

router.post('/', authenticateJWT, createMeasurment);

router.get('/:id', authenticateJWT, getMeasurment);

router.delete('/:id', authenticateJWT, deleteMeasurment);

export default router;
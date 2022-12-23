import express from 'express';
import { authenticateJWT } from '../jwt_handler.js';

import { getDevices, createDevice, getDevice, deleteDevice, updateDevice } from '../controllers/devices_controller.js';

const router = express.Router();

router.get('/', authenticateJWT, getDevices);

router.post('/', authenticateJWT, createDevice);

router.get('/:id', authenticateJWT, getDevice);

router.delete('/:id', authenticateJWT, deleteDevice);

router.patch('/:id', authenticateJWT, updateDevice);

export default router;
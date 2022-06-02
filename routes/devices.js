import express from 'express';
import { authenticateJWT } from '../jwt_handler.js';

import { getDevices, createDevice, getDevice, deleteDevice, updateDevice } from '../controllers/devices_controller.js';

const router = express.Router();

router.get('/', authenticateJWT, getDevices);

router.post('/', createDevice);

router.get('/:id', getDevice);

router.delete('/:id', deleteDevice);

router.patch('/:id', updateDevice);

export default router;
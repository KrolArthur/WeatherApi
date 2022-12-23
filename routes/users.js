import express from 'express';
import { authenticateJWT } from '../jwt_handler.js';

import { getUsers, createUser, getUser, deleteUser, updateUser } from '../controllers/users_controller.js';

const router = express.Router();

router.get('/', authenticateJWT, getUsers);

router.post('/', authenticateJWT, createUser);

router.get('/:id', authenticateJWT, getUser);

router.delete('/:id', authenticateJWT, deleteUser);

router.patch('/:id', authenticateJWT, updateUser);

export default router;
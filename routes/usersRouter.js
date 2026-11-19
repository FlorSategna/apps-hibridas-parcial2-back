import express from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import validateId from '../middlewares/validateId.js';

const router = express.Router();
const controller = new UserController();

router.get('/', authMiddleware, roleMiddleware, controller.getAll);
router.get('/:id', authMiddleware, roleMiddleware, validateId, controller.getById);
router.post('/', authMiddleware, roleMiddleware, controller.create);
router.put('/:id', authMiddleware, roleMiddleware, validateId, controller.update);
router.delete('/:id', authMiddleware, roleMiddleware, validateId, controller.delete);

export default router;
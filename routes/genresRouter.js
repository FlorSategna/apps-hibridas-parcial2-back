import express from 'express';
import GenresController from '../controllers/GenreController.js';
import validateGenre from '../middlewares/validateGenre.js';
import validateId from '../middlewares/validateId.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();
const controller = new GenresController();

router.get('/', controller.getAll);
router.get('/:id', validateId, controller.getById);
router.post('/', authMiddleware, roleMiddleware, validateGenre, controller.create);
router.put('/:id', authMiddleware, roleMiddleware, validateId, validateGenre, controller.update);
router.delete('/:id', authMiddleware, roleMiddleware, validateId, controller.delete);

export default router;

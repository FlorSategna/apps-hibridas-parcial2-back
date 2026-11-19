import { Router } from 'express';
import MoviesController from '../controllers/MovieController.js';
import validateMovie from '../middlewares/validateMovie.js';
import validateId from '../middlewares/validateId.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import upload from '../middlewares/uploadMovieMiddleware.js';

const router = Router();
const controller = new MoviesController();

// filtros y búsqueda
router.get('/buscar/nombre', controller.searchByName);
router.get('/filtrar', controller.getFiltered);
router.get('/:mid/reviews', validateId, controller.getReviewsByMovie);

router.get('/', controller.getAll);
router.get('/:mid', validateId, controller.getById);
router.post('/', authMiddleware, roleMiddleware, validateMovie, controller.create);
router.put('/:mid', authMiddleware, roleMiddleware, validateId, validateMovie, controller.update);
router.delete('/:mid', authMiddleware, roleMiddleware, validateId, controller.delete);
router.post('/:mid/imagen', authMiddleware, roleMiddleware, validateId, upload.single('image'), controller.uploadImage);


export default router;





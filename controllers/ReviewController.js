import reviewService from '../services/ReviewService.js';

class ReviewsController {
    async getAll(req, res) {
        try {
            const reviews = await reviewService.getAll();

            res.json({
                message: 'success',
                data: reviews
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las reseñas'
            });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const review = await reviewService.getById(id);

            if (!review) {
                return res.status(404).json({
                    message: 'Reseña no encontrada',
                    data: {}
                });
            }

            res.json({
                message: 'success',
                data: review
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la reseña'
            });
        }
    }

    async getByMovie(req, res) {
        try {
            const mid = req.params.mid;
            const rating = req.query.rating;

            const reviews = await reviewService.getByMovie(mid, rating);

            res.json({
                message: 'success',
                data: reviews
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las reseñas de la película'
            });
        }
    }

    async create(req, res) {
        try {
            const { movie, comment, rating } = req.body;
            const user = req.user.id;

            const review = await reviewService.create({ movie, user, comment, rating });

            if (!review) {
                return res.status(404).json({
                    message: 'La película no existe'
                });
            }

            res.status(201).json({
                message: 'success',
                data: review
            });
        } catch (error) {
            res.status(500).json({
                message: `Error al crear la reseña - ${error.message}`
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const { comment, rating, active } = req.body;

            const review = await reviewService.update(id, { comment, rating, active });

            if (!review) {
                return res.status(404).json({
                    message: 'Reseña no encontrada'
                });
            }

            res.json({
                message: 'success',
                data: review
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar la reseña'
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            const review = await reviewService.delete(id);

            if (!review) {
                return res.status(404).json({
                    message: 'Reseña no encontrada'
                });
            }

            res.json({
                message: 'success'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar la reseña'
            });
        }
    }
}

export default ReviewsController;
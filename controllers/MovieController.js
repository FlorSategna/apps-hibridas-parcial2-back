import movieService from '../services/MovieService.js';


class MovieController {
    async getAll(req, res) {
        try {
            const movies = await movieService.getAll();

            res.json({
                message: 'success',
                data: movies
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las películas'
            });
        }
    }

    async getById(req, res) {
        try {
            const mid = req.params.mid;
            const movie = await movieService.getById(mid);

            if (!movie) {
                return res.status(404).json({
                    message: 'Película no encontrada',
                    data: {}
                });
            }

            res.json({
                message: 'success',
                data: movie
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la película'
            });
        }
    }

    async getReviewsByMovie(req, res) {
        try {
            const mid = req.params.mid;
            const rating = req.query.rating;

            const reviews = await movieService.getReviewsByMovie(mid, rating);

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

    async getFiltered(req, res) {
        try {
            const { year, genre } = req.query;

            const movies = await movieService.getFiltered(year, genre);

            res.json({
                message: 'success',
                data: movies
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'Error al filtrar películas', error: error.message
            });
        }
    }

    async searchByName(req, res) {
        try {
            const { name } = req.query;

            if (!name) {
                return res.status(400).json({
                    message: 'Se debe ingresar un nombre para buscar'
                });
            }

            const movies = await movieService.searchByName(name);

            res.json({
                message: 'success',
                data: movies
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al buscar películas por nombre'
            });
        }
    }

    async create(req, res) {
        try {
            const {title, year, genre, description} = req.body;
            const movie = await movieService.create({title, year, genre, description});

            res.status(201).json({
                message: 'success',
                data: movie
            });
        } catch (error) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.mid;
            const {title, year, genre, description} = req.body;

            const movie = await movieService.update(
                id,
                {title, year, genre, description}
            );

            if (!movie) {
                return res.status(404).json({
                    message: 'Película no encontrada'
                });
            }

            res.json({
                message: 'success',
                data: movie
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar la película'
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.mid;

            const exists = await movieService.delete(id);

            if (exists?.blocked) {
                return res.status(400).json({
                    message: 'No es posible eliminar películas con reseñas asociadas'
                });
            }

            if (!exists) {
                return res.status(404).json({
                    message: 'Película no encontrada'
                });
            }

            res.json({
                message: 'success'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar la película'
            });
        }
    }

    async uploadImage(req, res) {
        try {
            if (!req.file) {
                return res.status(400).json({
                    message: 'No se envio el archivo'
                });
            }

            const imagePath = `/uploads/movies/${req.file.filename}`;
            const id = req.params.mid;

            const movie = await movieService.uploadImage(id, imagePath);

            if (!movie) {
                return res.status(404).json({
                    message: 'Película no encontrada'
                });
            }

            res.json({
                message: 'Imagen actualizada',
                data: movie
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al subir la imagen de la película'
            });
        }
    }
}

export default MovieController;
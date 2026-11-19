import genreService from '../services/GenreService.js';

class GenreController {
    async getAll(req, res) {
        try {
            const genres = await genreService.getAll();

            res.json({
                message: 'success',
                data: genres
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los géneros'
            });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const genre = await genreService.getById(id);

            if (!genre) {
                return res.status(404).json({
                    message: 'Género no encontrado'
                });
            }

            res.json({
                message: 'success',
                data: genre
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener el género'
            });
        }
    }

    async create(req, res) {
        try {
            const { name } = req.body;

            const genre = await genreService.create({ name });

            res.json({
                message: 'success',
                data: genre
            });
        } catch (error) {
            res.status(500).json({
                message: `Error al crear el género - ${error.message}`
            });
        }
    }

    async update(req, res) {
        try {
            const id = req.params.id;
            const { name, active } = req.body;

            const genre = await genreService.update(id, { name, active });

            if (!genre) {
                return res.status(404).json({
                    message: 'Género no encontrado'
                });
            }

            res.json({
                message: 'success',
                data: genre
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar el género'
            });
        }
    }

    async delete(req, res) {
        try {
            const id = req.params.id;

            // No permitir borrar géneros con películas asociadas
            const genre = await genreService.delete(id);

                if (genre?.blocked) {
                    return res.status(400).json({
                        message: 'No es posible eliminar un género con películas asociadas'
                    });
                }

                if (!genre) {
                    return res.status(404).json({
                        message: 'Género no encontrado'
                    });
                }

            res.json({
                message: 'success'
            });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar el género'
            });
        }
    }
}

export default GenreController;
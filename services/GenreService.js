
import Genre from '../models/genresModel.js';
import Movie from '../models/moviesModel.js';

class GenreService {
    async getAll() {
        return await Genre.find();
    }

    async getById(id) {
        return await Genre.findById(id);
    }

    async create(data) {
        return await Genre.create(data);
    }

    async update(id, data) {
        return await Genre.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        );
    }

    async delete(id) {
        const movies = await Movie.find({ genre: id });

        if (movies.length > 0) {
            return { blocked: true };
        }

        return await Genre.findByIdAndDelete(id);
    }
}

export default new GenreService();

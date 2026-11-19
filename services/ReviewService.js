
import Review from '../models/reviewsModel.js';
import Movie from '../models/moviesModel.js';

class ReviewService {
    async getAll() {
        return await Review.find()
            .sort({ createdAt: -1 })
            .populate('movie')
            .populate('user', 'name');
    }

    async getById(id) {
        return await Review.findById(id)
            .populate('movie')
            .populate('user', 'name');
    }

    async getByIdForOwner(id) {
        return await Review.findById(id);
    }

    async getByMovie(mid, rating) {
        const filter = { movie: mid };

        if (rating) {
            filter.rating = rating;
        }

        return await Review.find(filter)
            .sort({ createdAt: -1 })
            .populate('movie')
            .populate('user', 'name');
    }

    async create(data) {
        const movieExists = await Movie.findById(data.movie);

        if (!movieExists) {
            return null;
        }

        return await Review.create(data);
    }

    async update(id, data) {
        return await Review.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        );
    }

    async delete(id) {
        return await Review.findByIdAndDelete(id);
    }
}

export default new ReviewService();

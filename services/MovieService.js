
import Movie from '../models/moviesModel.js';
import Review from '../models/reviewsModel.js';

class MovieService {
    async getAll() {
        return await Movie.find().select('title year genre image');
    }

    async getById(id) {
        return await Movie.findById(id).populate('genre');
    }

    async getReviewsByMovie(mid, rating) {
        const filter = { movie: mid };

        if (rating) {
            filter.rating = rating;
        }

        return await Review.find(filter)
            .sort({ createdAt: -1 })
            .populate('movie')
            .populate('user', 'name');
    }

    async getFiltered(year, genre) {
        const filter = {};

        if (year) {
            filter.year = Number(year);
        }

        if (genre) {
            filter.genre = genre;
        }

        return await Movie.find(filter).populate('genre');
    }

    async searchByName(name) {
        return await Movie.find({
            title: { $regex: name, $options: 'i' }
        }).populate('genre');
    }

    async create(data) {
        return await Movie.create(data);
    }

    async update(id, data) {
        return await Movie.findByIdAndUpdate(
            id,
            data,
            { new: true, runValidators: true }
        );
    }

    async delete(id) {
        const reviews = await Review.find({ movie: id });

        if (reviews.length > 0) {
            return { blocked: true };
        }

        return await Movie.findByIdAndDelete(id);
    }

    async uploadImage(id, imagePath) {
        return await Movie.findByIdAndUpdate(
            id,
            { image: imagePath },
            { new: true }
        );
    }
}

export default new MovieService();

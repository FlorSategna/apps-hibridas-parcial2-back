
import bcrypt from 'bcrypt';
import Users from '../models/usersModel.js';
import Review from '../models/reviewsModel.js';

class UserService {
    async getAll() {
        return await Users.find().select('name email role');
    }

    async getById(id) {
        return await Users.findById(id).select('-password');
    }

    async create(name, email, password) {
        const exists = await Users.findOne({ email });

        if (exists) {
            return null;
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new Users({
            name,
            email,
            password: passwordHash
        });

        await newUser.save();

        return newUser;
    }

    async update(id, name, email, password) {
        const passwordHash = await bcrypt.hash(password, 10);

        const data = {
            name,
            email,
            password: passwordHash
        };

        return await Users.findByIdAndUpdate(id, data);
    }

    async delete(id) {
        const reviews = await Review.find({ user: id });

        if (reviews.length > 0) {
            return { blocked: true };
        }

        return await Users.findByIdAndDelete(id);
    }
}

export default new UserService();

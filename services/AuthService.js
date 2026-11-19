
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/usersModel.js';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

class AuthService {
    async register(name, email, password) {
        const exists = await User.findOne({ email });

        if (exists) {
            return null;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        return {
            id: newUser._id,
            email: newUser.email
        };
    }

    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            return null;
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return null;
        }

        const payload = {
            id: user._id,
            name: user.name,
            role: user.role
        };

        const token = jwt.sign(
            payload,
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        return token;
    }
}

export default new AuthService();

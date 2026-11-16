import mongoose from 'mongoose';

const validateId = (req, res, next) => {
    const id = req.params.id || req.params.mid;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID inválido' });
    }

    next();
};

export default validateId;
import bcrypt from 'bcrypt';

// Importa los Modelos
import Users from "../models/usersModel.js";
import Review from "../models/reviewsModel.js";


const getUsers = async (req, res) => {
    try {
        const data = await Users.find().select('name email role');
        res.json( {message: 'success', data: data });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id).select('-password');
        if( !user){
            return res.status(404).json({ message: 'Usuario no encontrado', data: {}});
        }
        res.status(200).json( {message: 'success', data: user });
        } catch (error) {
        if (error.name === 'CastError') {
        return res.status(400).json({ message: 'ID inválido' });
        }
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};
const postUser = async (req, res) => {
    try {
        const { body } = req;
        const { name, email, password} = body;

        if( !name || !email || !password){
            return res.status(400).json({ message: 'Faltan Parametros Obligatorios' });
        }

        // Verificamos que el email no este registrado
        const exists = await Users.findOne( { email: email });
        if( exists){
            return res.status(400).json({ message: 'El usuario ya existe', data: {} });
        }

        // Hasheamos la contrasña y esparamos
        const passwordHash = await bcrypt.hash( password, 10);
        const newUser = new Users({
            name,
            email,
            password: passwordHash
        });


        await newUser.save();
        const id = newUser._id;
        res.status(201).send(` Usuario Registrado con el ID ${id} `);
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};
const updateUserById = async ( req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const { name, email, password} = body;

        if( !name || !email || !password){
            return res.status(400).json({ message: 'Faltan Parametros Obligatorios' });
        }
        const passwordHash = await bcrypt.hash( password, 10);

        const data = {
            name,
            email,
            password: passwordHash
        }
        const user = await Users.findByIdAndUpdate(id, data );
        if( !user){
            return res.status(404).json({ message: 'Usuario no encontrado', data: {} });
        }
        res.status(200).json( {message: 'success', data: {} });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // No permitir eliminar usuarios con reseñas asociadas
        const reviews = await Review.find({ user: id });
        if( reviews.length > 0){
            return res.status(400).json({ message: 'No es posible eliminar un usuario con reseñas' });
        }

        const user = await Users.findByIdAndDelete( id);
        if( !user){
            return res.status(404).json({ message: 'Usuario no encontrado', data: {}});
        }
        res.status(200).json( {message: 'success', data: {} });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

export { getUsers, getUserById, postUser, updateUserById, deleteUser};
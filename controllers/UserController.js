import userService from '../services/UserService.js';


class UserController {

    async getAll(req, res) {
        try {
            const data = await userService.getAll();
            res.json( {message: 'success', data: data });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await userService.getById(id);
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
    }

    async create(req, res) {
        try {
            const { body } = req;
            const { name, email, password} = body;

            if( !name || !email || !password){
                return res.status(400).json({ message: 'Faltan Parametros Obligatorios' });
            }

            // Verificamos que el email no este registrado
            const newUser = await userService.create({ name, email, password });

            if (newUser?.exists) {
                return res.status(400).json({ message: 'El usuario ya existe', data: {} });
            }

            const id = newUser._id;
            res.status(201).send(` Usuario Registrado con el ID ${id} `);
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { body } = req;
            const { name, email, password} = body;

            if( !name || !email || !password){
                return res.status(400).json({ message: 'Faltan Parametros Obligatorios' });
            }
            
            const user = await userService.update(id, { name, email, password });
            
            if( !user){
                return res.status(404).json({ message: 'Usuario no encontrado', data: {} });
            }
            res.status(200).json( {message: 'success', data: {} });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            const user = await userService.delete(id);

            if (user?.blocked) {
                return res.status(400).json({ message: 'No es posible eliminar un usuario con reseñas' });
            }
            
            if( !user){
                return res.status(404).json({ message: 'Usuario no encontrado', data: {}});
            }
            res.status(200).json( {message: 'success', data: {} });
        } catch (error) {
            res.status(500).json({ message: 'Error en el servidor', error: error.message });
        }
    }

}

export default UserController;
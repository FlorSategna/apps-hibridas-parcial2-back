import authService from '../services/AuthService.js';

class AuthController {
    async register( req, res) {
        try {
            const { name, email, password } = req.body;

            if( !name || !email || !password){
                return res.status(400).send('Faltan Parametros Obligatorios');
            }

            // Verificar que el usuario no este registrado
            const data = await authService.register(name, email, password);

                if (!data) {
                    return res.status(400).json({
                        message: 'El usuario ya existe',
                        data: {}
                    });
                }

                res.status(201).json({
                    message: 'success',
                    data
                });


        } catch (error) {
            console.log( error);
            return res.status(500).json({
                    message: error.message
                })
        }
    }
    async login( req, res) {
        try {
            const { email, password } = req.body;

            if( !email || !password){
                return res.status(400).send('Faltan Parametros Obligatorios');
            }

            // Verificar que el email exista
            const token = await authService.login(email, password);

                if (!token) {
                    return res.status(401).json({
                        message: 'Credenciales Invalidas'
                    });
                }

                res.json({
                    message: 'Credenciales Correctas!',
                    token
                });

        } catch (error) {
            console.log( error);
            return res.status(500).json({
                    message: error.message
                })
        }

    }


}

export default AuthController;
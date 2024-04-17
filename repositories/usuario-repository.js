const Usuario = require('../models/usuario-model');

class UsuarioRepository {

    async criar(login, senha) {
        try {
        const usuario = await Usuario.create({
            login,
            senha,
        });
            return usuario;
        } catch (error) {
            throw ('Erro ao criar usuário no banco de dados: ' + error.message);
        }
    }

    async listar() {
        try {
            const listaUsuario = await Usuario.findAll({
                limit: 20 
              });
          return listaUsuario;
        } catch (error) {
          throw new Error('Erro ao listar usuários');
        }
    }
}

module.exports = new UsuarioRepository();
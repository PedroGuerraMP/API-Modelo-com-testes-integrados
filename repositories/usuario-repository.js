const bcrypt = require ('bcrypt');

const UsuarioModel = require('../models/usuario-model');

class UsuarioRepository {

    async criar(login, senha) {
        try {
            const salt = await bcrypt.genSalt(10);
            const senhaCriptografada = bcrypt.hashSync(senha, salt);

            return await UsuarioModel.create({
                login: login,
                senha: senhaCriptografada,
            });

        } catch (error) {
            throw ('Erro ao criar usuário no banco de dados: ' + error.message);
        }
    }

    async listar() {
        try {

            return await UsuarioModel.findAll({
                limit: 20 
            });

        } catch (error) {
          throw 'Erro ao listar usuários';
        }
    }
    
    async pesquisarPorLogin(login) {
        try {

            return await UsuarioModel.findOne({
                where: { login: login }
            });

        } catch (error) {
          throw 'Erro ao buscar usuário';
        }
    }
}

module.exports = new UsuarioRepository();
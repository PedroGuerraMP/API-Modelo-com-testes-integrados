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
            throw error.message;
        }
    }

    async listar() {
        try {

            return await UsuarioModel.findAll({
                limit: 20 
            });

        } catch (error) {
            throw error.message;
        }
    }
    
    async pesquisarPorLogin(login) {
        try {

            return await UsuarioModel.findOne({
                where: { login: login }
            });

        } catch (error) {
            throw error.message;
        }
    }

    async editar(paramLogin, novaSenha){
        try{
            
            const salt = await bcrypt.genSalt(10);
            const senhaCriptografada = await bcrypt.hashSync(novaSenha, salt); 
            
            const [linhasAlteradas] = await UsuarioModel.update(
                { senha: senhaCriptografada},
                { where: {login: paramLogin} } 
            )

            if(linhasAlteradas == 0)
                throw "Nenhum registro encontrado";
        }
        catch (error) {
            throw error.message? error.message : error;
        }
    }

    async deletar(login){
        try{
            const linhasDeletadas = await UsuarioModel.destroy(
                { where: {login: login} } 
            )

            if(linhasDeletadas == 0)
                throw "Nenhum registro encontrado";
        }
        catch (error) {
            throw error.message? error.message : error;
        }
    }
}

module.exports = new UsuarioRepository();
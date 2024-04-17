const { Op } = require('sequelize');

const DespesaModel = require('../models/despesa-model');

class DespesaRepository {

    async criar(login, descricao, data, valor) {
        try {

            console.log(new Date(data).toString())

            return await DespesaModel.create({
                loginUsuario: login,
                descricao: descricao,
                data: new Date(data).toString(),
                valor: valor
            });

        } catch (error) {
            throw error.message;
        }
    }

    async listar(login) {
        try {

            return await DespesaModel.findAll({
                limit: 20,
                where: { loginUsuario: login }
            });

        } catch (error) {
            throw error.message;
        }
    }
    
    async pesquisarPorDescricao(login, descricao) {
        try {

            return await DespesaModel.findOne({
                where: { 
                    loginUsuario: login, 
                    descricao: {
                        [Op.like]: '%'+descricao+'%'
                    } 
                }
            });

        } catch (error) {
            throw error.message;
        }
    }

    async editar(login, descricao, valor, data){
        try{
            
            const [linhasAlteradas] = await DespesaModel.update(
                { 
                    descricao: descricao,
                    valor: valor,
                    data: data
                },
                { where: {loginUsuario: login} } 
            )

            if(linhasAlteradas == 0)
                throw "Nenhum registro encontrado";
        }
        catch (error) {
            throw error.message? error.message : error;
        }
    }

    async deletar(id, login){
        try{
            const linhasDeletadas = await DespesaModel.destroy(
                { where: {id: id, login:login} } 
            )

            if(linhasDeletadas == 0)
                throw "Nenhum registro encontrado";
        }
        catch (error) {
            throw error.message? error.message : error;
        }
    }
}

module.exports = new DespesaRepository();
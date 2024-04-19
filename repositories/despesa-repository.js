const { Op } = require('sequelize');

const DespesaModel = require('../utils/utils').loadModels().DespesaModel;

class DespesaRepository {

    async criar(login, descricao, data, valor) {
        try {

            let dataConvertida = new Date(data);

            if(isNaN(dataConvertida.getTime()) || dataConvertida > Date.now()) 
                throw "Data Inválida";

            if(isNaN(valor) || valor < 0)
                throw "Valor Inválido";

            if(descricao.length == 0 || descricao.length > 191)
                throw "Descrição Inválida";

            return await DespesaModel.create({
                loginUsuario: login,
                descricao: descricao,
                data: new Date(data).toString(),
                valor: valor
            });

        } catch (error) {
            throw error.message? error.message : error;
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
            if(isNaN(new Date(data).getTime()) || new Date(data) > Date.now()) 
                throw "Data Invalida";

            if(isNaN(valor) || valor < 0)
                throw "Valor Inválido";

            if(descricao.length == 0 || descricao.length > 191)
                throw "Descrição Inválida";

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
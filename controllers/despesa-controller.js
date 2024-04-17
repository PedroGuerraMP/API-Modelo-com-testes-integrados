const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

const DespesaRepository = require('../repositories/despesa-repository')
const { authenticateToken } = require('../utils/utils')

const DespesaController = express();

DespesaController.use(bodyParser.json());

DespesaController.get('', authenticateToken, async (req, res) => {
    try{
        const { descricao } = req.query;
        var listaDespesa;
        if(descricao)
            listaDespesa = await DespesaRepository.pesquisarPorDescricao(req.userId, descricao)
        else
            listaDespesa = await DespesaRepository.listar(req.userId);
        res.status(200).json(listaDespesa);

    } catch (error) {
        console.error('Erro ao Listar Despesas:', error);
        res.status(400).json(error);
    }
});

DespesaController.post('', authenticateToken, async (req, res) => {
    try{
        const { descricao, valor, data } = req.body;
        const novaDespesa = await DespesaRepository.criar(req.userId, descricao, data, valor)
        res.status(201).json(novaDespesa);
    } catch (error) {
        console.error('Erro ao Criar Despesa:', error);
        res.status(400).json(error);
    }
});

DespesaController.put('', authenticateToken, async (req, res) => {
    try{
        const { descricao, valor, data } = req.body;
        const novaDespesa = await DespesaRepository.editar(req.userId, descricao, valor, data)
        res.status(201).json(novaDespesa);
    } catch (error) {
        console.error('Erro ao Editar Despesa:', error);
        res.status(400).json(error);
    }
});

DespesaController.delete('', authenticateToken, async (req, res) => {
    try{
        const { id } = req.query;
        await DespesaRepository.deletar(id, req.userId)
        res.status(204).json();
    } catch (error) {
        console.error('Erro ao Deletar Despesa:', error);
        res.status(400).json(error);
    }
});

module.exports = {
    DespesaController
};
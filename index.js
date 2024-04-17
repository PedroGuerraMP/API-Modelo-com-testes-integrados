const express = require('express');
const cors = require('cors');

const sequelize = require('./database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

async function init(){
    try {
        await sequelize.authenticate();
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        await sequelize.sync({ alter: true });
        console.log('Modelos sincronizados com o banco de dados.');
        
        app.use(cors());
        app.use('/', routes);
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    } catch (error) {
        console.error('Erro ao Abrir o servidor:', error);
    }
}

init();
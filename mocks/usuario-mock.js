const SequelizeMock = require('sequelize-mock');

var dbMock = new SequelizeMock();

const Usuario = dbMock.define('Usuario', {
    login: 'TesteMock',
    senha: 'senha'
}, { });

Usuario.$queueResult( Usuario.build({ login: 'TesteMock',senha: 'senha' }) );

Usuario.create = async () => {
    return {
        login: 'Teste',
        senha: 'Senha'
    }
}

module.exports = Usuario;
const SequelizeMock = require('sequelize-mock');

var dbMock = new SequelizeMock();

const Usuario = dbMock.define('Usuario', {}, { autoQueryFallback: false });

Usuario.create = async () => {
    return {
        login: 'Teste',
        senha: 'Senha'
    }
}

Usuario.findOne = async (object) => {
    if(object.where.login == 'Login Existente')
        return Usuario.build({ 
            login: 'TesteMock',
            senha: '$2b$10$jufuIr0NgbI7.3ERJiGfZehjcsR0Lams0c4rJg5A8cKBSGqnkM/26' 
        });
}

Usuario.findAll = async () => {
        return [ Usuario.build({ 
                    login: 'TesteMock',
                    senha: '$2b$10$jufuIr0NgbI7.3ERJiGfZehjcsR0Lams0c4rJg5A8cKBSGqnkM/26' 
                }),
                Usuario.build({ 
                    login: 'TesteMock',
                    senha: '$2b$10$jufuIr0NgbI7.3ERJiGfZehjcsR0Lams0c4rJg5A8cKBSGqnkM/26' 
                })];
}

Usuario.update = async (object, object2) =>{
    if(object2.where.login == 'Login Existente')
        return [1];
    
    return [0];
}

Usuario.destroy = async (object) => {
    return 1;
}

module.exports = Usuario;
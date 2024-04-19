const SequelizeMock = require('sequelize-mock');

var dbMock = new SequelizeMock();

const Despesa = dbMock.define('Despesa', {}, { autoQueryFallback: false });

Despesa.create = async () => {
    return {
        descricao: "Despesa-teste",
        data: "2024-04-17",
        valor: 1.23,
        login: "teste"
    }
}

Despesa.findOne = async (object) => {
    if(object.where.login == 'Login Existente')
        return Despesa.build({ 
            login: 'TesteMock',
            senha: '$2b$10$jufuIr0NgbI7.3ERJiGfZehjcsR0Lams0c4rJg5A8cKBSGqnkM/26' 
        });
}

Despesa.findAll = async () => {
        return [ Despesa.build({ 
                    descricao: "Despesa-teste",
                    data: "2024-04-17",
                    valor: 1.23,
                    login: "teste"
                    }),
                Despesa.build({ 
                    descricao: "Despesa-teste",
                    data: "2024-04-17",
                    valor: 1.23,
                    login: "teste"
                })];
}

Despesa.update = async (object, object2) =>{
    if(object2.where.loginUsuario == 'Login Existente')
        return [1];
    
    return [0];
}

Despesa.destroy = async (object) => {
    return 1;
}

module.exports = Despesa;
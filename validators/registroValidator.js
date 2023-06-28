const registroValidator = {
    nome: {
        required: 'Nome obrigatório',
        minLength: { value: 3, message: 'A quantidade mínima é 3' },

    },

    senha: {
        required: 'Senha obrigatória',
        minLength: { value: 8, message: 'A quantidade mínima é 8' },

    },

    email: {
        required: 'Email obrigatório',
        pattern: { value: /[^\s@]+@[^\s@]+\.[^\s@]+/gi, message: 'email invalido'},

    },

    cpf: {
        required: 'Cpf obrigatório',
        minLength: { value: 11, message: 'A quantidade mínima é 11' },
    },

    telefone: {
        required: 'Telefone obrigatório',
        minLength: { value: 11, message: 'A quantidade mínima é 11' },
    },

    cep: {
        required: 'CEP obrigatório',
        minLength: { value: 8, message: 'A quantidade mínima é 8' },

    }
}


export default registroValidator
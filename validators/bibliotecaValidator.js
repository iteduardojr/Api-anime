const bibliotecaValidator = {
    estudio: {
        required: 'Estúdio obrigatório',
        minLength: { value: 3, message: 'A quantidade mínima é 3' },

    },

    producao: {
        required: 'Produção obrigatória',
        minLength: { value: 3, message: 'A quantidade mínima é 3' },

    },

    lancamento: {
        required: 'Lançamento obrigatório',
        minLength: { value: 4, message: 'A quantidade mínima é 4' },

    }

}


export default bibliotecaValidator
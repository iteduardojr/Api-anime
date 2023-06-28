const indicacaoValidator = {
    nome: {
        required: 'Nome obrigatório',
        minLength: { value: 3, message: 'A quantidade mínima é 3' },

    },

    estudio: {
        required:  'Temporada obrigatório',

    },

    producao: {
        required: 'Episódio obrigatória',
    },

    lancamento: {
        required: 'Lançamento obrigatória',
        minLength: { value: 4, message: 'A quantidade mínima é 4' },
    },


}


export default indicacaoValidator
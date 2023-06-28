const anotacaoValidator = {
    nome: {
        required: 'Nome obrigatório',
        minLength: { value: 3, message: 'A quantidade mínima é 3' },

    },

    temporada: {
        required:  'Temporada obrigatória',

    },

    ep: {
        required: 'Episódio obrigatório',
    },

    personagem: {
  
        minLength: { value: 5, message: 'A quantidade mínima é 5' },
    },

    opniao: {
  
        minLength: { value: 5, message: 'A quantidade mínima de caracteres é 5' },
    }

}


export default anotacaoValidator
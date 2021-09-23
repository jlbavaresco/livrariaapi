const express = require('express')
const cors = require('cors')
const { pool } = require('./config')


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: '*'
}))
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

const controleEditora = require('./controladores/editoras')
const controleLivro = require('./controladores/livros')

app
    .route('/editoras')
    .get(controleEditora.getEditoras)
    .post(controleEditora.addEditora)
    .put(controleEditora.updateEditora)

app
    .route('/editoras/:codigo')
    .get(controleEditora.getEditoraPorCodigo)
    .delete(controleEditora.deleteEditora)


app
    .route('/livros')
    .get(controleLivro.getLivros)
    .post(controleLivro.addLivro)
    .put(controleLivro.updateLivro)

app
    .route('/livros/:codigo')
    .get(controleLivro.getLivroPorCodigo)
    .delete(controleLivro.deleteLivro)    

    
app.listen(process.env.PORT || 3002, () => {
    console.log('Servidor rodando na porta 3002')
})




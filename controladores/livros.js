const { pool } = require("../config");
const { request, response } = require("express");

const getLivros = (request, response) => {
    pool.query("select l.codigo as codigo, l.nome as nome, l.autor as autor,  \
    to_char(l.data_lancamento, \'DD-MM-YYYY\') as data_lancamento, \
    l.editora as editora, e.nome as editora_nome \
    from livros l \
    join editoras e on e.codigo = l.editora order by l.codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar os livros: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getLivros = getLivros;

const addLivro = (request, response) => {
    const { nome , autor, data_lancamento, editora } = request.body

    pool.query(
        'insert into livros (nome , autor, data_lancamento, editora) values ($1, $2, $3, $4)',
        [nome , autor, data_lancamento, editora],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir o livro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Livro criado.' })
        }        
    )
}

module.exports.addLivro = addLivro;


const updateLivro = (request, response) => {
    const { codigo, nome , autor, data_lancamento, editora } = request.body

    pool.query(
        'update livros set nome = $1, autor = $2, data_lancamento = $3, editora = $4 where codigo = $5',
        [nome , autor, data_lancamento, editora, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar o livro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Livro atualizado.' })
        }        
    )
}

module.exports.updateLivro = updateLivro;

const deleteLivro = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from livros where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover o livro: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Livro removido.' })
        }        
    )
}

module.exports.deleteLivro = deleteLivro;

const getLivroPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select l.codigo as codigo, l.nome as nome, l.autor as autor, to_char(l.data_lancamento, \'YYYY-MM-DD\') as data_lancamento, \
        l.editora as editora, e.nome as editora_nome \
        from livros l \
        join editoras e on e.codigo = l.editora where l.codigo = $1 order by l.codigo ',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar o livro: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getLivroPorCodigo = getLivroPorCodigo;
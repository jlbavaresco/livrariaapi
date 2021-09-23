const { pool } = require("../config");
const { request, response } = require("express");

const getEditoras = (request, response) => {
    pool.query("select * from editoras order by codigo", (error, results) => {
        if (error) {
            return response.status(401).json({status: 'error', 
            message: 'Erro ao recuperar as editoras: ' + error});
        }
        response.status(200).json(results.rows)
    })
}

module.exports.getEditoras = getEditoras;

const addEditora = (request, response) => {
    const { nome , site } = request.body

    pool.query(
        'insert into editoras (nome, site) values ($1, $2)',
        [nome, site],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao inserir as editoras: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Editora criada.' })
        }        
    )
}

module.exports.addEditora = addEditora;


const updateEditora = (request, response) => {
    const { codigo, nome , site } = request.body

    pool.query(
        'update editoras set nome = $1, site = $2 where codigo = $3',
        [nome, site, codigo],
        (error) => {
            if (error) {
                return response.status(401).json({ status: 'error', 
                message: 'Erro ao atualizar as editoras: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Editora atualizada.' })
        }        
    )
}

module.exports.updateEditora = updateEditora;

const deleteEditora = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'delete from editoras where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível remover a editora: ' + error });
            }
            response.status(201).json({ status: 'success', message: 'Editora removida.' })
        }        
    )
}

module.exports.deleteEditora = deleteEditora;

const getEditoraPorCodigo = (request, response) => {

    const codigo = parseInt(request.params.codigo)    

    pool.query(
        'select * from editoras where codigo = $1',
        [codigo],
        (error, results) => {
            if (error || results.rowCount == 0) {
                return response.status(401).json({ status: 'error', 
                message: 'Não foi possível recuperar a editora: ' + error });
            }
            response.status(201).json(results.rows)
        }        
    )
}

module.exports.getEditoraPorCodigo = getEditoraPorCodigo;
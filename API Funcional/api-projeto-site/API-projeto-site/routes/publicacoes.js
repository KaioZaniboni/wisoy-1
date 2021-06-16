var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Publicacao = require('../models').Publicacao;
var Leitura = require('../models').Leitura;

/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/publicar/:idsensor', function(req, res, next) {
    console.log("Iniciando Publicação...")
    
	let idsensor = req.params.idsensor;

    Publicacao.create({
        descricao: req.body.descricao,
        fkUsuario: idsensor
    }).then(resultado => {
        console.log("Post realizado com sucesso!!");
        res.send(resultado);
    }).catch(erro => {
        console.log('DEU UM ERRINHO')
        console.error(erro);
        res.status(500).send(erro.message);
    })
})

/* ROTA QUE RECUPERA TODAS AS PUBLICAÇÕES */
router.get('/a/:fkempresa', function(req, res, next) {
	console.log('Recuperando todas as publicações');

	var fkEmp = req.params.fkempresa;
	
    let instrucaoSql = `SELECT * FROM usuarios 
    where fk_empresa = ${fkEmp}
    ORDER BY usuarios.id_usuarios`;

	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});


/* ROTA QUE RECUPERA AS PUBLICAÇÕES DE UM USUÁRIO PELO ID */
router.get('/', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
	var idusuario = req.params.idusuario;

    let instrucaoSql = `SELECT 
    usuarios.nome,
    descricao
    FROM publicacao
    INNER JOIN usuarios
    ON Publicacao.fkUsuario = Usuarios.id_usuarios
    WHERE fkUsuario = ${idsensor}
    ORDER BY publicacao.id DESC`;

	sequelize.query(instrucaoSql, {
		model: Leitura,
		mapToModel: true 
	})
	.then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);
		res.json(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

module.exports = router;

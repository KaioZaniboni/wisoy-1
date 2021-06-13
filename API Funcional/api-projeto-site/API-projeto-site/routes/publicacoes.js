var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Publicacao = require('../models').Publicacao;
var Leitura = require('../models').Leitura;
var env = process.env.NODE_ENV || 'development';

/* ROTA QUE RECUPERA CRIA UMA PUBLICAÇÃO */
router.post('/publicar/:idcaminhao', function(req, res, next) {
    console.log("Iniciando Publicação...")
    
	let idcaminhao = req.params.fk_sensor;

    Publicacao.create({
        descricao: req.body.descricao,
        fkUsuario: idcaminhao
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
router.get('/', function(req, res, next) {
	console.log('Recuperando todas as publicações');
	
    let instrucaoSql = `fk_sensor , count(fk_sensor) as inseridos, round(avg(leitura_umidade),2) as media,
     max(leitura_umidade) as maximo,  min(leitura_umidade) as minimo,
    DATE_FORMAT(from_unixtime(unix_timestamp(leitura_data_hora) - unix_timestamp(leitura_data_hora) mod 300), '%Y-%m-%d %H:%i:00') as cinco_min
    from historico_sensor where fk_sensor = 1001 group by cinco_min;`;

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
	
	let idcaminhao = req.params.fk_sensor;

    let instrucaoSql = `fk_sensor , count(fk_sensor) as inseridos, round(avg(leitura_umidade),2) as media,
    max(leitura_umidade) as maximo,  min(leitura_umidade) as minimo,
   DATE_FORMAT(from_unixtime(unix_timestamp(leitura_data_hora) - unix_timestamp(leitura_data_hora) mod 300), '%Y-%m-%d %H:%i:00') as cinco_min
   from historico_sensor where fk_sensor = ${idcaminhao} group by cinco_min;`;

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

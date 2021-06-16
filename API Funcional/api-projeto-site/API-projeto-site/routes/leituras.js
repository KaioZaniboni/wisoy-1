var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;
var env = process.env.NODE_ENV || 'development';



/* Recuperar as últimas N leituras */
router.get('/ultimas/:idsensor', function (req, res, next) {

	// quantas são as últimas leituras que quer? 7 está bom?
	const limite_linhas = 7;

	var idsensor = req.params.idsensor;

	console.log(`Recuperando as ultimas ${limite_linhas} leituras`);

	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select leitura_umidade, leitura_data_hora, DATE_FORMAT(leitura_data_hora,'%H:%i:%s') as momento_grafico from historico_sensor where fk_sensor = ${idsensor} order by id_historico desc limit ${limite_linhas}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select TOP (${limite_linhas}) leitura_umidade, leitura_data_hora,CONVERT(varchar(12),leitura_data_hora) as momento_grafico from historico_sensor where fk_sensor = ${idsensor} order by id_historico desc;`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}

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


router.get('/tempo-real/:idsensor', function (req, res, next) {
	console.log('Recuperando caminhões');

	//var idsensor = req.body.idsensor; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idsensor = req.params.idsensor;

	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select leitura_umidade, leitura_data_hora, DATE_FORMAT(leitura_data_hora,'%H:%i:%s') as momento_grafico, fk_sensor from historico_sensor where fk_sensor = ${idsensor} order by id_historico desc limit 1`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select TOP (1) leitura_umidade, leitura_data_hora, CONVERT(varchar(12),leitura_data_hora) as momento_grafico from historico_sensor where fk_sensor = ${idsensor} order by id_historico desc;`;
	} else {
		console.log("\n\n\n\nVERIFIQUE O VALOR DE LINHA 1 EM APP.JS!\n\n\n\n")
	}

	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
});

// estatísticas (max, min, média, mediana, quartis, etc)
router.get('/estatisticas', function (req, res, next) {

	console.log(`Recuperando as estatísticas atuais`);

	let instrucaoSql = `SELECT fk_sensor , count(fk_sensor) as inseridos, round(avg(leitura_umidade),2) as media,
    max(leitura_umidade) as maximo,  min(leitura_umidade) as minimo,
   DATE_FORMAT(from_unixtime(unix_timestamp(leitura_data_hora) - unix_timestamp(leitura_data_hora) mod 300), 
   '%Y-%m-%d %H:%i:00') as cinco_min from historico_sensor where fk_sensor = 1001 group by cinco_min`;


	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});



module.exports = router;

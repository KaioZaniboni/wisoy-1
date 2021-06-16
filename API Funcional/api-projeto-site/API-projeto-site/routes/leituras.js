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
router.get('/estatisticas/:chart/:period', function (req, res, next) {

	let idsensor = req.params.chart;
	let periodo = req.params.period;

	console.log(`Recuperando as estatísticas atuais`);

	let instrucaoSql = `SELECT 
	fk_sensor,count(fk_sensor) AS inseridos, 
	round(avg(leitura_umidade),2) AS media, 
	max(leitura_umidade) AS maximo,  
	min(leitura_umidade) AS minimo,
	cinco_min
from (
	SELECT *,
	dateadd(
    S,
    (DATEDIFF(s, {d '1970-01-01'}, leitura_data_hora) / ${periodo}),
    '1970-01-01') AS cinco_min
	FROM historico_sensor
) tabela where fk_sensor = ${idsensor} group by fk_sensor, cinco_min;`;


	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});

});



module.exports = router;

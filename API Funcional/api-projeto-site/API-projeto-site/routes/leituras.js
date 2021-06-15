var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;
var env = process.env.NODE_ENV || 'development';



/* Recuperar as últimas N leituras */
router.get('/ultimas/:idcaminhao', function (req, res, next) {

	// quantas são as últimas leituras que quer? 7 está bom?
	const limite_linhas = 7;

	var idcaminhao = req.params.idcaminhao;

	console.log(`Recuperando as ultimas ${limite_linhas} leituras`);

	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select LEITURA_UMIDADE, LEITURA_DATA_HORA, DATE_FORMAT(LEITURA_DATA_HORA,'%H:%i:%s') as momento_grafico from HISTORICO_SENSOR where FK_SENSOR = ${idcaminhao} order by ID_HISTORICO desc limit ${limite_linhas}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select TOP (${limite_linhas}) LEITURA_UMIDADE, LEITURA_DATA_HORA,CONVERT(varchar(12),LEITURA_DATA_HORA) as momento_grafico from HISTORICO_SENSOR where FK_SENSOR = ${idcaminhao} order by ID_HISTORICO desc;`;
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


router.get('/tempo-real/:idcaminhao', function (req, res, next) {
	console.log('Recuperando caminhões');

	//var idcaminhao = req.body.idcaminhao; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idcaminhao = req.params.idcaminhao;

	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select LEITURA_UMIDADE, LEITURA_DATA_HORA, DATE_FORMAT(LEITURA_DATA_HORA,'%H:%i:%s') as momento_grafico, FK_SENSOR from HISTORICO_SENSOR where FK_SENSOR = ${idcaminhao} order by ID_HISTORICO desc limit 1`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select TOP (1) LEITURA_UMIDADE, LEITURA_DATA_HORA, CONVERT(varchar(12),LEITURA_DATA_HORA) as momento_grafico from HISTORICO_SENSOR where FK_SENSOR = ${idcaminhao} order by ID_HISTORICO desc;`;
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

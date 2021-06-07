var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize; //esse leitura puxado é o mapeamento da tabela;
var Leitura = require('../models').Leitura; //esse leitura puxado é o mapeamento da tabela;
var env = process.env.NODE_ENV || 'development';

/* Recuperar as últimas N leituras */

//A função  obterDadosGraficoPrimeiraVez(idsensor) utiliza; 


router.get('/ultimas/:idsensor', function(req, res, next) {
	//este idsensor é a minha fk; determino ela aqui em cima e no select de acordo com o nome da tabela;
	// quantas são as últimas leituras que quer? 7 está bom?
	const limite_linhas = 7; //máximo de linhas;

	var idsensor = req.params.idsensor;

	console.log(`Recuperando as ultimas ${limite_linhas} leituras`);
	
	let instrucaoSql = "";

	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		//Aqui tenho meu select que quero que ele pegue;Aqui os dados já existem!
		instrucaoSql = `select  
		LEITURA_UMIDADE, 
		LEITURA_DATA_HORA
		from HISTORICO_SENSOR
		where FK_SENSOR = ${idsensor}
		order by id desc limit ${limite_linhas}`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top ${limite_linhas} 
		LEITURA_UMIDADE, 
		LEITURA_DATA_HORA
		from HISTORICO_SENSOR
		where FK_SENSOR = ${idsensor}
		order by id desc`;

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


//A função  atualizarGrafico(idsensor, dados) pega;

router.get('/tempo-real/:idsensor', function(req, res, next) {
	console.log('Recuperando caminhões');
	
	//var idsensor = req.body.idsensor; // depois de .body, use o nome (name) do campo em seu formulário de login
	var idsensor = req.params.idsensor;
	
	let instrucaoSql = "";
	
	if (env == 'dev') {
		// abaixo, escreva o select de dados para o Workbench
		instrucaoSql = `select LEITURA_UMIDADE, LEITURA_DATA_HORA, FK_SENSOR from HISTORICO_SENSOR where FK_SENSOR = ${idsensor} order by ID_HISTORICO desc limit 1`;
	} else if (env == 'production') {
		// abaixo, escreva o select de dados para o SQL Server
		instrucaoSql = `select top 1 LEITURA_UMIDADE,  LEITURA_DATA_HORA, FK_SENSOR from HISTORICO_SENSOR where FK_SENSOR = ${idsensor} order by ID_HISTORICO desc`;
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

// estatísticas (max, min, média, mediana, quartis etc)
router.get('/estatisticas', function (req, res, next) {
	
	console.log(`Recuperando as estatísticas atuais`);

	const instrucaoSql = `select 
							max(umidade) as umidade_maxima, 
							min(umidade) as umidade_minima, 
							avg(umidade) as umidade_media 
						from HISTORICO_SENSOR`;
					

	sequelize.query(instrucaoSql, { type: sequelize.QueryTypes.SELECT })
		.then(resultado => {
			res.json(resultado[0]);
		}).catch(erro => {
			console.error(erro);
			res.status(500).send(erro.message);
		});
  
});


module.exports = router;

var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
// var Leitura = require('../models').Leitura;
var env = process.env.NODE_ENV || 'development';

const { ArduinoDataTemp } = require("../app-sensores/newserial");
const { ArduinoDataHumidity } = require("../app-sensores/serialHumidity");

const { ArduinoDataSwitch } = require("../app-sensores/serialSwitch");
const { ArduinoDataLuminosity } = require("../app-sensores/serialLuminosidity");

router.get("/sendData", (request, response) => {

	const Humidity1 = ArduinoDataHumidity.List[ArduinoDataHumidity.List.length - 1];
	const Humidity2 = ArduinoDataHumidity.List[ArduinoDataHumidity.List.length - 2];
	const Humidity3 = ArduinoDataHumidity.List[ArduinoDataHumidity.List.length - 3];
	const Humidity4 = ArduinoDataHumidity.List[ArduinoDataHumidity.List.length - 4];

	var instrucaoSql = ""

	if (env == "dev") {

		// Na variável abaixo, coloque o Insert que será executado no Workbench
		// salvo exceções, é igual a SQL Server

		instrucaoSql = `INSERT into historico_sensor (leitura_umidade, leitura_data_hora, fk_sensor) values (${Humidity1},'${agora()}', 1000), (${Humidity2}, '${agora()}', 1001), (${Humidity3}, '${agora()}', 1002), (${Humidity4}, '${agora()}',1003);`;
	} else {

		// Na variável abaixo, coloque o Insert que será executado no SQL Server
		// salvo exceções, é igual a Workbench

		instrucaoSql = `INSERT into dbo.historico_sensor (leitura_umidade, leitura_data_hora, fk_sensor) values (${Humidity1},'${agora()}', 1000), (${Humidity2}, '${agora()}', 1001), (${Humidity3}, '${agora()}', 1002), (${Humidity4}, '${agora()}',1003);`;
	}

	sequelize.query(instrucaoSql, {
		//model: Leitura,
		//mapToModel: true
	}).then(resultado => {
			console.log(`\n\nRegistro inserido com sucesso!\nO comando executado foi como abaixo:\n`);
			console.log(instrucaoSql)
			console.log(`\nFim do comando SQL executado.`);
			response.status(200).send("Dado inserido com sucesso.");
		}).catch(erro => {
			console.error(erro);
			response.status(500).send(erro.message);
		});
});

function agora() {
	const agora_d = new Date();
	return `${agora_d.getFullYear()}-${agora_d.getMonth() + 1}-${agora_d.getDate()} ${agora_d.getHours()}:${agora_d.getMinutes()}:${agora_d.getSeconds()}`;
}

module.exports = router;

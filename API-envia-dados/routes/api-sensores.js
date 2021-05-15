var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
// var Leitura = require('../models').Leitura;
var leads = require('../models').leads
var env = process.env.NODE_ENV || 'development';

const { ArduinoDataTemp } = require("../app-sensores/newserial");
const { ArduinoDataHumidity } = require("../app-sensores/serialHumidity");

const { ArduinoDataSwitch } = require("../app-sensores/serialSwitch");
const { ArduinoDataLuminosity } = require("../app-sensores/serialLuminosidity");

router.get("/sendData", (request, response) => {
	const temperature = ArduinoDataTemp.List[ArduinoDataTemp.List.length - 1];
	const Humidity = ArduinoDataHumidity.List[ArduinoDataHumidity.List.length - 1];
	//luminosidade = ArduinoDataLuminosity.List[ArduinoDataLuminosity.List.length -1]

	var instrucaoSql = ""

	if (env == "dev") {

		// Na variável abaixo, coloque o Insert que será executado no Workbench
		// salvo exceções, é igual a SQL Server

		instrucaoSql = `INSERT into leads (ID_LEAD, NOME_FANTASIA, EMAIL, TELEFONE, CNPJ)
		values (NULL, 'Project Plant', 'contato@projectplant.com', '11987654321', '45433595000134'),
		(NULL, 'Soja Mais', 'soja_mais@hotmail.com', '11912345678', '55345678000145'),
		(NULL, 'Edinaldo Soja', 'edinal.soja@outlook.com.br', '11987774571', '98765432100015'),
		(NULL, 'Agro Soja', 'contato@agrosoja.com.br', '11995154321', '45433984534143'),
		(NULL, 'Agro Farm', 'agro_farm@gmail.com.br', '11955774205', '12345678000164')`;

		// instrucaoSql =` INSERT into COLABORADORES (ID_COLABORADORES, NOME, SEXO, DATA_NASCIMENTO, EMAIL, LOGIN_COLABORADORES, SENHA, TELEFONE, RG, CPF, ENDERECO, CARTEIRA_TRABALHO, DATA_ADMISSAO, FK_CHEFE)
		// values (NULL, 'Jonas Florencio', 'M', '2002-03-30', 'jonas_florencio@wisoy.com.br', 'jonas_wisoy', 'Jo54@p12', '11955250037', '503032217', '33299400574', 'Rua Professor Otavio Fernandes', '88833397', '2021-02-01'),
		// (NULL, 'Amanda Fruteiro', 'F', '2002-01-07', 'amanda_fruteiro@wisoy.com.br', 'amanda_wisoy', 'Am01#dsC', '11944064307', '243555719', '46955749916', 'Rua Enfermeira Luiza Alegreti', '77433397', '2021-02-01'),
		// (NULL, 'Matheus Vieck', 'M', '1998-02-13', 'matheus_vieck@wisoy.com.br', 'matheus_wisoy','Ma37#f13', '11955250037', '530075995', '46933797734', 'Rua Soldado Peixoto', '74421388', '2021-02-01')`;

		// instrucaoSQL = `INSERT into clientes (ID_CLIENTE, NOME_FANTASIA, TELEFONE, EMAIL, CPNJ, RAZAO_SOCIAL, DATA_CONTRATO, CHECK_TERMOS, FK_LEAD)
		// values (NULL, 'Project Plant', '11987654321', 'contato@projectplant.com', '45433595000134', 'João Plantação Agro', '2021-03-08', 1, 100),
		// (NULL, 'Unilever', '11987880572', 'contato@projectplant.com', '61068276000104', 'Unilever LTDA', '2021-01-15', 1, null),
		// (NULL, 'Agro Farm', '11955774205', 'agro_farm@gmail.com.br', '12345678000164', 'Agro Farms Comercio de Graos Eireli', '2021-04-08', 1, 104),
		// (NULL, 'Soja Hoje', '11966196606', 'soja_hoje@hotmail.com.br', '45455595000144', 'Soja Hoje LTDA', '2021-02-18', 1, null),
		// (NULL, 'Coca Cola', '11954320706', 'contato@cocacola.com.br', '45997418000153', 'COCA COLA INDUSTRIAS LTDA', '2020-12-23', 1, null)`;

		// instrucaoSql = `INSERT into USUARIOS_CLIENTE (ID_USUARIOS_CLIENTES, LOGIN_USUARIO, SENHA, FK_CLIENTES)
		// values (null, 'user1_plant', 'P@3507A', 15000),
		// (null, 'user2_plant', 'P@5700A', 15000),
		// (null, 'user3_plant', 'P#5503A', 15000),
		// (null, 'user1_lever', 'U@4433S', 15001),
		// (null, 'user2_lever', 'U#3211S', 15001),
		// (null, 'user3_lever', 'U@6671S', 15001),
		// (null, 'user1_farm', 'F@3257A', 15002),
		// (null, 'user2_farm', 'F#7707A', 15002),
		// (null, 'user1_shoje', 'S@4302H', 15003), 
		// (null, 'user2_shoje', 'S#2002H', 15003), 
		// (null, 'user2_shoje', 'S@5552H', 15003),
		// (null, 'user1_cola', 'C@5504C', 15004),
		// (null, 'user2_cola', 'C!2505C', 15004)`;

		// instrucaoSql = `INSERT into FAZENDAS (ID_FAZENDA, FK_CLIENTE, HECTARES, NUMERO_SENSORES, ENDERECO_FAZENDA)
		// values (NULL, 15000, 1000, 34, 'Rua Padre André'),
		// (NULL, 15000, 90, 3, 'Rua Andrade Lopes'),
		// (NULL, 15001, 1500, 50 , 'Rua Fernando Moreira'),
		// (NULL, 15002, 400, 14, 'Rua Cornelius Frederick'),
		// (NULL, 15002, 700, 24, 'Avenida Sapopemba'),
		// (NULL, 15003, 630, 21, 'Rua Engenheiro Alberto Nilman'),
		// (NULL, 15004, 10000, 334, 'Rua Coronel Armando')`;

		// instrucaoSql = `INSERT into SENSORES (ID_SENSOR, FK_FAZENDA, DATA_INSTALACAO, SENSOR_XY)
		// values (NULL, 1, '2021-03-11', '86.1638, -80.4437'), 
		// (NULL, 2, '2021-03-16', '-57.0430, -157.2459'),
		// (NULL, 3, '2021-01-25', '42.1108, 7.6416'), 
		// (NULL, 4, '2021-03-11', '70.2003, -165.4415'),
		// (NULL, 5, '2021-03-11', '-75.3722, -176.6609'), 
		// (NULL, 6, '2021-02-28', '-34.8391, 157.6925'),
		// (NULL, 7, '2021-01-02', '22.5029, 136.9261')`;

		// instrucaoSql = `INSERT into HIST_SENSOR (ID_HISTORICO, FK_SENSOR, LEITURA_UMIDADE, LEITURA_DATA_HORA)
		// values (null, 1000, '13.47%', '2021-03-11 14:55'),
		// (null, 1001, '13.39%', '2021-03-17'), 
		// (null, 1002, '14.98%', '2021-01-27'),
		// (null, 1003, '13.09%', '2021-03-14'), 
		// (null, 1004, '14.01%', '2021-03-30'),
		// (null, 1005, '13.57%', '2021-02-28'), 
		// (null, 1006, '13.08%', '2021-01-07')`;
	} else {

		// Na variável abaixo, coloque o Insert que será executado no SQL Server
		// salvo exceções, é igual a Workbench

		instrucaoSql = `INSERT into dbo.LEADS ( NOME_FANTASIA, EMAIL, TELEFONE, CNPJ)
		values ('Project Plant', 'contato@projectplant.com', '11987654321', '45433595000134'),
		('Soja Mais', 'soja_mais@hotmail.com', '11912345678', '55345678000145'),
		('Edinaldo Soja', 'edinal.soja@outlook.com.br', '11987774571', '98765432100015'),
		('Agro Soja', 'contato@agrosoja.com.br', '11995154321', '45433984534143'),
		('Agro Farm', 'agro_farm@gmail.com.br', '11955774205', '12345678000164')`;

		instrucaoSql =` INSERT into dbo.COLABORADORES ( NOME, SEXO, DATA_NASCIMENTO, EMAIL, LOGIN_COLABORADORES, SENHA, TELEFONE, RG, CPF, ENDERECO, CARTEIRA_TRABALHO, DATA_ADMISSAO, FK_CHEFE)
		values 
		( 'Jonas Florencio', 'M', '2002-03-30', 'jonas_florencio@wisoy.com.br', 'jonas_wisoy', 'Jo54@p12', '11955250037', '503032217', '33299400574', 'Rua Professor Otavio Fernandes', '88833397', '2021-02-01', 5003),
		( 'Amanda Fruteiro', 'F', '2002-01-07', 'amanda_fruteiro@wisoy.com.br', 'amanda_wisoy', 'Am01#dsC', '11944064307', '243555719', '46955749916', 'Rua Enfermeira Luiza Alegreti', '77433397', '2021-02-01', 5003),
		( 'Matheus Vieck', 'M', '1998-02-13', 'matheus_vieck@wisoy.com.br', 'matheus_wisoy','Ma37#f13', '11955250037', '530075995', '46933797734', 'Rua Soldado Peixoto', '74421388', '2021-02-01', 5003),
		( 'Kaio Zaniboni', 'M', '1992-03-28', 'kaio_zaniboni@wisoy.com.br', 'kaio_wisoy','Ka54@z92', '11950890317', '735407817', '45639877754', 'Rua Professor José Armandoi', '77733344', '2021-02-01', 5003)`;

		instrucaoSql = `INSERT into dbo.clientes ( NOME_FANTASIA, TELEFONE, EMAIL, CPNJ, RAZAO_SOCIAL, DATA_CONTRATO, CHECK_TERMOS, FK_LEAD, FK_COLABORADORES)
		values 
		( 'Project Plant', '11987654321', 'contato@projectplant.com', '45433595000134', 'João Plantação Agro', '2021-03-08', 1, 100, 5000),
		( 'Unilever', '11987880572', 'contato@projectplant.com', '61068276000104', 'Unilever LTDA', '2021-01-15', 1, null, 5002),
		( 'Agro Farm', '11955774205', 'agro_farm@gmail.com.br', '12345678000164', 'Agro Farms Comercio de Graos Eireli', '2021-04-08', 1, 104, 5001),
		( 'Soja Hoje', '11966196606', 'soja_hoje@hotmail.com.br', '45455595000144', 'Soja Hoje LTDA', '2021-02-18', 1, null, 5000),
		( 'Coca Cola', '11954320706', 'contato@cocacola.com.br', '45997418000153', 'COCA COLA INDUSTRIAS LTDA', '2020-12-23', 1, null, 5003)`;

		instrucaoSql = `INSERT into dbo.USUARIOS_CLIENTES ( LOGIN_USUARIO, SENHA, FK_CLIENTES)
		values 
		( 'user1_plant', 'P@3507A', 15000),
		( 'user2_plant', 'P@5700A', 15000),
		( 'user3_plant', 'P#5503A', 15000),
		( 'user1_lever', 'U@4433S', 15001),
		( 'user2_lever', 'U#3211S', 15001),
		( 'user3_lever', 'U@6671S', 15001),
		( 'user1_farm', 'F@3257A', 15002),
		( 'user2_farm', 'F#7707A', 15002),
		( 'user1_shoje', 'S@4302H', 15003), 
		( 'user2_shoje', 'S#2002H', 15003), 
		( 'user2_shoje', 'S@5552H', 15003),
		( 'user1_cola', 'C@5504C', 15004),
		( 'user2_cola', 'C!2505C', 15004)`;

		instrucaoSql = `INSERT into dbo.FAZENDAS ( FK_CLIENTE, HECTARES, NUMERO_SENSORES, ENDERECO_FAZENDA)
		values 
		( 15000, 1000, 34, 'Rua Padre André'),
		( 15000, 90, 3, 'Rua Andrade Lopes'),
		( 15001, 1500, 50 , 'Rua Fernando Moreira'),
		( 15002, 400, 14, 'Rua Cornelius Frederick'),
		( 15002, 700, 24, 'Avenida Sapopemba'),
		( 15003, 630, 21, 'Rua Engenheiro Alberto Nilman'),
		( 15004, 10000, 334, 'Rua Coronel Armando')`;

		instrucaoSql = `INSERT into dbo.SENSORES ( FK_FAZENDA, DATA_INSTALACAO, SENSOR_XY)
		values 
		( 1, '2021-03-11', '86.1638, -80.4437'), 
		( 2, '2021-03-16', '-57.0430, -157.2459'),
		( 3, '2021-01-25', '42.1108, 7.6416'), 
		( 4, '2021-03-11', '70.2003, -165.4415'),
		( 5, '2021-03-11', '-75.3722, -176.6609'), 
		( 6, '2021-02-28', '-34.8391, 157.6925'),
		( 7, '2021-01-02', '22.5029, 136.9261')`;

		instrucaoSql = `INSERT into dbo.HISTORICO_SENSOR (FK_SENSOR, LEITURA_UMIDADE, LEITURA_DATA_HORA)
		values 
		( 1001, '13.47%', '2021-03-11 14:55'),
		( 1002, '13.39%', '2021-03-17 14:55'), 
		( 1003, '14.98%', '2021-01-27 14:55'),
		( 1004, '13.09%', '2021-03-14 16:33'), 
		( 1005, '14.01%', '2021-03-30 16:33'),
		( 1006, '13.57%', '2021-02-28 17:25'), 
		( 1007, '13.08%', '2021-01-07 17:25')`;
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

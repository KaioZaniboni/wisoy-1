var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;
var Leads = require('../models').Leads;
var Cadastrar_PJ = require('../models').Cadastrar_PJ;
var Colaboradores = require('../models').Colaboradores;

let sessoes = [];
var idempresa = [];
var user_principal = 'Sim';

/* Recuperar usuário por login e senha */
router.post('/autenticar', function (req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login

	let instrucaoSql = `select * from usuarios where login='${login}' and senha ='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Usuario
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.login);
			console.log('sessoes: ', sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Recuperar colaborador por login e senha */
router.post('/autenticar-adm', function (req, res, next) {
	console.log('Recuperando usuário por login e senha');

	var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
	var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login

	let instrucaoSql = `select * from colaboradores where login='${login}' and senha ='${senha}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Colaboradores
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);

		if (resultado.length == 1) {
			sessoes.push(resultado[0].dataValues.login);
			console.log('sessoes: ', sessoes);
			res.json(resultado[0]);
		} else if (resultado.length == 0) {
			res.status(403).send('Login e/ou senha inválido(s)');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}

	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Cadastrar usuário principal */
router.post('/cadastrar/', function (req, res, next) {
	console.log('Criando um usuário');

	var keygen = req.body.serial;

	let instrucaoSql = `select * from empresa where chave_autenticação='${keygen}'`;
	console.log(instrucaoSql);

	sequelize.query(instrucaoSql, {
		model: Cadastrar_PJ
	}).then(resultado => {
		console.log(`Encontrados: ${resultado.length}`);


		if (resultado.length == 1) {
			idempresa.push(resultado[0].dataValues.id_empresa);

			Usuario.create({
				nome: req.body.nome,
				login: req.body.login,
				senha: req.body.senha,
				fk_empresa: idempresa,
				data_cadastro: agora(),
				usuario_principal: user_principal
			}).then(resultado => {
				console.log(`Registro criado: ${resultado}`)
				res.send(resultado);
			}).catch(erro => {
				console.error(erro);
				res.status(500).send(erro.message);
			});

		} else if (resultado.length == 0) {
			res.status(403).send('Chave inválida');
		} else {
			res.status(403).send('Mais de um usuário com o mesmo login e senha!');
		}
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});



/* Cadastrar LEADS */
router.post('/cadastrar_leads', function (req, res, next) {
	console.log('Cadastrando um LEAD');

	Leads.uptade({
		nome_fantasia: req.body.nome_fantasia,
		email: req.body.email,
		telefone: req.body.telefone,
		cnpj: req.body.cnpj
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Cadastrar PJ */
router.post('/cadastrar_pj', function (req, res, next) {
	console.log('Cadastrando um PJ');

	Cadastrar_PJ.create({
		razao_social: req.body.razao_social,
		nome_fantasia: req.body.nome_fantasia,
		cnpj: req.body.cnpj,
		telefone: req.body.telefone,
		email: req.body.email,
		data_contrato: agora(),
		// fk_lead: req.body.fk_lead,
		chave_autenticação: req.body.chave_autenticação
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Cadastrar usuarios secundários */
router.post('/cadastrar_subordinados/:fkempresa', function (req, res, next) {
	console.log('Criando um usuário');

	var fkEmp = req.params.fkempresa;

	Usuario.create({
		nome: req.body.nome,
		login: req.body.login,
		senha: req.body.senha,
		fk_empresa: fkEmp,
		data_cadastro: agora()
	}).then(resultado => {
		console.log(`Registro criado: ${resultado}`)
		res.send(resultado);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

/* Alterar Usuários */
// router.post('/autenticar-adm', function (req, res, next) {
// 	console.log('Recuperando usuário por login e senha');

// 	var login = req.body.login; 
// 	var senha = req.body.senha; 

// 	console.log(instrucaoSql);

// 	sequelize.query(instrucaoSql, {
// 		model: Colaboradores
// 	}).then(resultado => {
// 		console.log(`Encontrados: ${resultado.length}`);

// 		let instrucaoSql = `select * from colaboradores where login='${login}' and senha ='${senha}'`;

// 	}).catch(erro => {
// 		console.error(erro);
// 		res.status(500).send(erro.message);
// 	});
// });



/* Verificação de usuário */
router.get('/sessao/:login', function (req, res, next) {
	let login = req.params.login;
	console.log(`Verificando se o usuário ${login} tem sessão`);

	let tem_sessao = false;

	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] == login) {
			tem_sessao = true;
			break;
		}
	}

	if (tem_sessao) {
		let mensagem = `Usuário ${login} possui sessão ativa!`;
		console.log(mensagem);
		res.send(mensagem);
	} else {
		res.sendStatus(403);
	}

});

/* Logoff de usuário */
router.get('/sair/:login', function (req, res, next) {
	let login = req.params.login;
	console.log(`Finalizando a sessão do usuário ${login}`);
	let nova_sessoes = []
	for (let u = 0; u < sessoes.length; u++) {
		if (sessoes[u] != login) {
			nova_sessoes.push(sessoes[u]);
		}
	}
	sessoes = nova_sessoes;
	res.send(`Sessão do usuário ${login} finalizada com sucesso!`);
});


/* Recuperar todos os usuários */
router.get('/', function (req, res, next) {
	console.log('Recuperando todos os usuários');
	Usuario.findAndCountAll().then(resultado => {
		console.log(`${resultado.count} registros`);

		res.json(resultado.rows);
	}).catch(erro => {
		console.error(erro);
		res.status(500).send(erro.message);
	});
});

function agora() {
	const agora_d = new Date();
	return `${agora_d.getFullYear()}-${agora_d.getMonth() + 1}-${agora_d.getDate()} ${agora_d.getHours()}:${agora_d.getMinutes()}:${agora_d.getSeconds()}`;
}

module.exports = router;

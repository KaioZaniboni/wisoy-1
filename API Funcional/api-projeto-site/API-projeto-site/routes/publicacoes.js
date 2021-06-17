var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Leitura = require('../models').Leitura;

/* ROTA QUE RECUPERA TODOS OS USUARIOS */
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

module.exports = router;

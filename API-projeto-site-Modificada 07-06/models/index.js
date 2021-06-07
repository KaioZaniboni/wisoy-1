'use strict'; //importar uma biblioteca;
//para usar uma biblioteca, eu crio uma variável;

var fs        = require('fs');//biblioteca
var path      = require('path');//biblioteca
var Sequelize = require('sequelize');//biblioteca
var basename  = path.basename(__filename);//biblioteca
var env       = process.env.NODE_ENV || 'development'; //variavel global que pega se é dev ou production
var config    = require(__dirname + '/../config/config.js')[env];
var db        = {};

console.warn(`\n===> você está no ambiente: ${env}\n \tSe dev, usando Workbench local\n\tSe production, usando nuvem Azure`);//aviso , n necessariamente um erro; aqui é a mensagem de quando inicia a api



if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
} //aqui basicamente está pegando os arquivos lá de config.js, os dados , senha , banco de dados e etc;

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

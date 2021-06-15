	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Colaboradores = sequelize.define('Colaboradores',{
		id_colaboradores: {
			field: 'id_colaboradores',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},		
		nome: {
			field: 'nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		sexo: {
			field: 'sexo',
			type: DataTypes.STRING,
			allowNull: false
		},
		data_nascimento: {
			field: 'data_nascimento',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		login: {
			field: 'login',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		telefone: {
			field: 'telefone',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		rg: {
			field: 'rg',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		cpf: {
			field: 'cpf',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		endereco: {
			field: 'endereco',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		carteira_trabalho: {
			field: 'carteira_trabalho',
			type: DataTypes.STRING,
			allowNull: false
		},
		data_admissao: {
			field: 'data_admissao',
			type: DataTypes.DATE,
			allowNull: false
		}
	}, 
	{
		tableName: 'colaboradores', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Colaboradores;
};

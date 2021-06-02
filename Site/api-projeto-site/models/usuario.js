'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
	var Usuario = sequelize.define('Usuario', {
		id: {
			field: 'ID_USUARIOS',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		nome: {
			field: 'nome',
			type: DataTypes.STRING,
			allowNull: false
		},
		login: {
			field: 'login',
			type: DataTypes.STRING,
			allowNull: false
		},
		senha: {
			field: 'SENHA',
			type: DataTypes.STRING,
			allowNull: false
		},
		check: {
			field: 'CHECK_TERMOS',
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		fk_empresa: {
			field: 'FK_EMPRESA',
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
		{
			tableName: 'USUARIOS',
			freezeTableName: true,
			underscored: true,
			timestamps: false,
		});

	return Usuario;
};
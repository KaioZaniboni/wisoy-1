	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Cadastrar_PJ = sequelize.define('Cadastrar_PJ',{
		id_empresa: {
			field: 'id_empresa',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		razao_social: {
			field: 'razao_social',
			type: DataTypes.STRING,
			allowNull: false
		},		
		nome_fantasia: {
			field: 'nome_fantasia',
			type: DataTypes.STRING,
			allowNull: false
		},
		telefone: {
			field: 'telefone',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'email',
			type: DataTypes.STRING,
			allowNull: false
		},
		cnpj: {
			field: 'cnpj',
			type: DataTypes.STRING,
			allowNull: false
		},
		data_contrato: {
			field: 'data_contrato',
			type: DataTypes.DATE,
			allowNull: false
		},
		// fk_lead: {
		// 	field: 'fk_lead',
		// 	type: DataTypes.INT,
		// 	allowNull: true
		// },
		chave_autenticação: {
			field: 'chave_autenticação',
			type: DataTypes.STRING,
			allowNull: false
		}
	}, 
	{
		tableName: 'empresa', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Cadastrar_PJ;
};

'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Leads = sequelize.define('Leads',{	
		id: {
			field: 'ID_LEAD',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		nome_fantasia: {
			field: 'NOME_FANTASIA',
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			field: 'EMAIL',
			type: DataTypes.STRING, 
			allowNull: false
		},
        telefone: {
			field: 'TELEFONE',
			type: DataTypes.STRING,
			allowNull: false
		},
        cnpj: {
			field: 'CNPJ',
			type: DataTypes.STRING, 
			allowNull: false
		}
	
	}, 
	{
		tableName: 'LEADS', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Leads;
};
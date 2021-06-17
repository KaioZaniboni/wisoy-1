	'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Usuario = sequelize.define('Usuario',{
		id: {
			field: 'id_usuarios',
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
			field: 'senha',
			type: DataTypes.STRING,
			allowNull: false
		},
		fk_empresa: {
			field: 'fk_empresa',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		data_cadastro: {
			field: 'data_cadastro',
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		usuario_principal: {
			field: 'usuario_principal',
			type: DataTypes.STRING,
			allowNull: true
		}
	}, 
	{
		tableName: 'usuarios', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Usuario;
};

'use strict';

/* 
lista e explicação dos Datatypes:

*/

module.exports = (sequelize, DataTypes) => {
    let Leitura = sequelize.define('Leitura',{	
		id: {
			field: 'ID_HISTORICO',
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},	
		fk_sensor: {
			field: 'FK_SENSOR',
			type: DataTypes.INTEGER,
			allowNull: false
		},
		umidade: {
			field: 'LEITURA_UMIDADE',
			type: DataTypes.REAL,
			allowNull: false
		},
		momento: {
			field: 'LEITURA_DATA_HORA',
			type: DataTypes.DATE, // NÃO existe DATETIME. O tipo DATE aqui já tem data e hora
			allowNull: false
		},
		// momento_grafico: {
		// 	type: DataTypes.VIRTUAL, // campo 'falso' (não existe na tabela). Deverá ser preenchido 'manualmente' no select
		// 	allowNull: true
		// }
	}, 
	{
		tableName: 'HISTORICO_SENSOR', 
		freezeTableName: true, 
		underscored: true,
		timestamps: false,
	});

    return Leitura;
};

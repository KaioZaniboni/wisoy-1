module.exports = {
  // Insira aqui seus dados do banco NA NUVEM AZURE; apresentar e colocar pro publico
  //Ambiente conectado Azure
  production: {
    // altere APENAS username, password, database e host.
    username: 'grupo11', /*Nome usuário*/ 
    password: 'GPO011@#', /*Senha*/ 
    database: 'WiSoy', /*nome BD*/ 
    host: 'wisoy3.database.windows.net', /*Visão geral; nome do servidor*/ 
    dialect: 'mssql',/*MysSql server da microsoft */
    xuse_env_variable: 'DATABASE_URL',
    dialectOptions: {
      options: {
        encrypt: true
      }
    },
    pool: { 
      max: 5,
      min: 1,
      acquire: 5000,
      idle: 30000,
      connectTimeout: 5000
    }
  },

  // Insira aqui seus dados do banco LOCAL - MySQL Workbench; desenvolvimento aplicação
   //Ambiente conectado Localmente
  dev: {
    // altere APENAS username, password e database.
    username: 'SEU_NOME_DE_USUARIO_DO_BANCO_DE_DADOS -- provavelmente é "root"',
    password: 'SUA_SENHA_DO_BANCO_DE_DADOS',
    database: 'SEU DATABASE CRIADO EM "CREATE DATASE"',
    host: '127.0.0.1',
    dialect: 'mysql',
    xuse_env_variable: 'DATABASE_URL',
    dialectOptions: {
      options: {
        encrypt: true
      }
    },
    pool: { 
      max: 5,
      min: 1,
      acquire: 5000,
      idle: 30000,
      connectTimeout: 5000
    }
  },
};
 
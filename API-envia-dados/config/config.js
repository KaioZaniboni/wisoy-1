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
    username: 'root',
    password: 'R@phael1',
    database: 'wisoy',
    host: '3306',
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
 
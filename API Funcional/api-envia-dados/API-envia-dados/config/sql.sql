/* SCRIPT DO BANCO NA NUVEM (AZURE) - WISOY */

/* Está em ordem de drop table */

CREATE TABLE leads (
  id_lead INT PRIMARY KEY IDENTITY(100,1),
  nome_fantasia VARCHAR(60),
  email VARCHAR(60),
  telefone VARCHAR(11),
  cnpj VARCHAR(23)
);

CREATE TABLE empresa (
  id_empresa INT PRIMARY KEY IDENTITY (15000,1),
  razao_social VARCHAR(50),
  nome_fantasia VARCHAR(60),
  cnpj VARCHAR(23),
  telefone VARCHAR(15),
  email VARCHAR (50),
  data_contrato DATE,
  fk_lead INT,
  chave_autenticação varchar(20)
);

CREATE TABLE usuarios (
	id_usuarios INT PRIMARY KEY IDENTITY,
	nome VARCHAR(50),
	login VARCHAR(50),
	senha VARCHAR(50),
	fk_empresa INT,
  data_cadastro DATE,
  usuario_principal varchar
);

CREATE TABLE fazendas(
  id_fazenda INT PRIMARY KEY IDENTITY (1,1),
  fk_empresa INT,
  hectares INT,
  numero_sensores INT,
  endereco_fazenda VARCHAR(100)
);

CREATE TABLE sensores (
  id_sensor INT PRIMARY KEY IDENTITY (1000,1),
  fk_fazenda INT,
  data_instalacao DATE,
  sensor_xy VARCHAR (45)
);

CREATE TABLE colaboradores (
  id_colaboradores INT PRIMARY KEY IDENTITY (5000,1),
  nome VARCHAR(60),
  sexo CHAR(1),
  data_nascimento DATE,
  email VARCHAR(60),
  login VARCHAR(20),
  senha VARCHAR(20),
  telefone VARCHAR(11),
  rg CHAR(9),
  cpf CHAR(11),
  endereco VARCHAR(100) ,
  carteira_trabalho CHAR(8),
  data_admissao DATE
);

CREATE TABLE historico_sensor (
	id_historico INT PRIMARY KEY IDENTITY,
	leitura_umidade DECIMAL,
	leitura_data_hora DATETIME,
	fk_sensor INT
);


/* para workbench - local - desenvolvimento */

-- create database enviaDados;

-- use enviaDados;

-- CREATE TABLE leitura (
-- 	id INT PRIMARY KEY AUTO_INCREMENT,
-- 	temperatura DECIMAL,
-- 	umidade DECIMAL,
-- 	momento DATETIME,
-- 	fkcaminhao INT
-- );

-- CREATE TABLE usuario (
-- 	id INT PRIMARY KEY AUTO_INCREMENT,
-- 	nome VARCHAR(50),
-- 	login VARCHAR(50),
-- 	senha VARCHAR(50)
-- );
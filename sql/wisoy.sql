-- -----------------------------------------------------
-- Cria e usa o banco de dados "wisoy".
-- -----------------------------------------------------
CREATE DATABASE wisoy;
USE wisoy;

DROP database WISOY;
-- -----------------------------------------------------
-- A tabela LEADS sera responsável por armazenar as informações referentes as pessoas que acessaram o site e se cadastraram nesse campo, são os interessados.
-- -----------------------------------------------------
CREATE TABLE LEADS (
  ID_LEAD INT NOT NULL AUTO_INCREMENT,
  NOME VARCHAR(60),
  SEXO CHAR(1),
  EMAIL VARCHAR(60),
  TELEFONE VARCHAR(11),
  CPF_CNPJ VARCHAR(23),
  PRIMARY KEY (ID_LEAD));

DESC LEADS;
-- -----------------------------------------------------
-- A tabela CLIENTES será responsável por armazenar todos os dados referentes ao cadastro de cada cliente.
-- -----------------------------------------------------
CREATE TABLE CLIENTES (
  ID_CLIENTE INT NOT NULL AUTO_INCREMENT,
  NOME VARCHAR(60),
  SEXO CHAR(1),
  DATA_NASCIMENTO DATE,
  EMAIL VARCHAR(60),
  USUARIO VARCHAR(20),
  SENHA VARCHAR(20),
  TELEFONE VARCHAR(11),
  RG CHAR(9),
  CPF_CPNJ VARCHAR(23),
  RAZAO_SOCIAL VARCHAR(50),
  ENDERECO_CLIENTE VARCHAR(100),
  DADOS_BANCARIOS CHAR(27),
  DATA_CONTRATO DATE,
  PRIMARY KEY (ID_CLIENTE),
  FK_LEAD INT,
  FOREIGN KEY (FK_LEAD) REFERENCES LEADS (ID_LEAD),
  FK_FUNCIONARIOS INT,
  FOREIGN KEY (FK_FUNCIONARIOS) REFERENCES FUNCIONARIOS(ID_FUNCIONARIO)
);

DESC CLIENTES;
-- -----------------------------------------------------
-- A tabela FAZENDAS será responsável por armazenar os dados referentes às fazendas dos clientes.
-- -----------------------------------------------------
CREATE TABLE FAZENDAS(
  ID_FAZENDA INT NOT NULL AUTO_INCREMENT,
  FK_CLIENTE INT NOT NULL,
  HECTARES INT,
  NUMERO_SENSORES INT,
  ENDERECO_FAZENDA VARCHAR(100),
  PRIMARY KEY (ID_FAZENDA),
  CONSTRAINT FK_FAZENDAS_CLIENTES
  FOREIGN KEY (FK_CLIENTE)
  REFERENCES CLIENTES (ID_CLIENTE));

DESC FAZENDAS;
-- -----------------------------------------------------
-- A tabela SENSORES irá conter todos os sensores que a wisoy já implantou, data de instalação e em qual fazenda se encontram.
-- -----------------------------------------------------
CREATE TABLE SENSORES (
  ID_SENSOR INT NOT NULL AUTO_INCREMENT,
  FK_FAZENDA INT NOT NULL,
  DATA_INSTALACAO DATE,
  PRIMARY KEY (ID_SENSOR),
  CONSTRAINT FK_SENSORES_FAZENDAS
  FOREIGN KEY (FK_FAZENDA)
  REFERENCES FAZENDAS (ID_FAZENDA));

DESC SENSORES;
-- -----------------------------------------------------
-- A tabela FUNCIONARIOS contera dados de todo quadro de funcionários WiSoy.
-- -----------------------------------------------------
CREATE TABLE FUNCIONARIOS (
  ID_FUNCIONARIO INT NOT NULL AUTO_INCREMENT,
  NOME VARCHAR(60),
  SEXO CHAR(1),
  DATA_NASCIMENTO DATE,
  EMAIL VARCHAR(60),
  USUARIO VARCHAR(20),
  SENHA VARCHAR(20),
  TELEFONE VARCHAR(11),
  RG CHAR(9),
  CPF CHAR(11),
  ENDERECO VARCHAR(100) ,
  CARTEIRA_TRABALHO CHAR(8),
  DATA_CONTRATO DATE,
  PRIMARY KEY (ID_FUNCIONARIO));

DESC FUNCIONARIOS;
-- -----------------------------------------------------
-- A tabela OCORRENCIAS tem o propósito de armazenar todas as ocorrências relacionadas ao serviços WiSoy relatadas por clientes.
-- -----------------------------------------------------
CREATE TABLE OCORRENCIAS (
  ID_OCORRENCIA INT NOT NULL AUTO_INCREMENT,
  FK_CLIENTE INT NOT NULL,
  FK_FUNCIONARIO INT NOT NULL,
  RELATO VARCHAR(280),
  DATA_OCORRENCIA DATE,
  DATA_RELATO DATE,
  PRIMARY KEY (ID_OCORRENCIA),
  CONSTRAINT FK_OCORRENCIAS_CLIENTES
  FOREIGN KEY (FK_CLIENTE)
  REFERENCES CLIENTES (ID_CLIENTE),
  CONSTRAINT FK_OCORRENCIAS_FUNCIONARIOS
  FOREIGN KEY (FK_FUNCIONARIO)
  REFERENCES FUNCIONARIOS (ID_FUNCIONARIO));

DESC OCORRENCIAS;
-- -----------------------------------------------------
-- A tabela DADOS tem a função de armazenar todos os dados coletados pelos sensores com a finalidade de utiliza-los na construção de gráficos, históricos, e outros serviços que serão oferecidos aos clientes.
-- -----------------------------------------------------
CREATE TABLE DADOS (
  ID_DADOS INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  FK_SENSOR INT NOT NULL,
  SENSOR_XY CHAR(17),
  ESTADO_SENSOR VARCHAR(9),
  LEITURA_UMIDADE CHAR(6),
  LEITURA_DATA_HORA CHAR(16),
  CONSTRAINT FK_DADOS_SENSORES
  FOREIGN KEY (FK_SENSOR)
  REFERENCES SENSORES (ID_SENSOR));
  
  DESC DADOS;
-- -----------------------------------------------------
-- Inserts para testes
-- -----------------------------------------------------

INSERT INTO LEADS VALUES (NULL, 'nome lead01', 'F', '1999-12-31', 'emai_lead01@teste.com', '11987654321', '000000000', '00000000000');
INSERT INTO LEADS VALUES (NULL, 'nome lead02', 'M', '2000-01-01', 'emai_lead02@teste.com', '11912345678', '111111111', '11111111111');
SELECT * FROM LEADS;

INSERT INTO CLIENTES VALUES (NULL, 'nome cliente01', 'M', '1980-08-19', 'email_cliente01@teste.com', 'usuario_cliente01', 'senha_cliente01', '11999999999', '012345678', '00011100011', NULL, 'Endereço Cliente01', 'Dados Bancários Cliente01', '2021-03-08');
INSERT INTO CLIENTES VALUES (NULL, 'nome cliente02', 'M', '1990-02-28', 'email_cliente02@teste.com', 'usuario_cliente02', 'senha_cliente02', '11988888888', '876543210', '11100011100', NULL, 'Endereço Cliente02', 'Dados Bancários Cliente02', '2020-03-09');
SELECT * FROM CLIENTES;

INSERT INTO FAZENDAS VALUES(NULL, 1, 1250, 42, 'endereço fazenda01');
INSERT INTO FAZENDAS VALUES(NULL, 1, 625, 21, 'endereço fazenda02');
INSERT INTO FAZENDAS VALUES(NULL, 2, 30, 1, 'endereço fazenda03');
INSERT INTO FAZENDAS VALUES(NULL, 2, 60, 2, 'endereço fazenda04');
SELECT * FROM FAZENDAS;

INSERT INTO SENSORES VALUES (NULL, 1, '2021-03-11');
INSERT INTO SENSORES VALUES (NULL, 2, '2020-03-11');
SELECT * FROM SENSORES;

INSERT INTO DADOS VALUES (1, 'X: 77.77 Y: 33.33', 'LIGADO', '13.47%', '2022-28-03 14:55');
INSERT INTO DADOS VALUES (1, 'X: 77.77 Y: 33.33', 'LIGADO', '16.35%', '2022-28-03 17:23');
INSERT INTO DADOS VALUES (2, 'X: 32.03 Y: 50.90', 'LIGADO', '13.47%', '2022-28-03 17:55');
INSERT INTO DADOS VALUES (2, 'X: 32.03 Y: 50.90', 'LIGADO', '16.35%', '2022-28-03 19:03');
SELECT * FROM DADOS;

INSERT INTO FUNCIONARIOS VALUES(NULL, 'nome funcionario01', 'F', '2002-02-20', 'email_funcionario01@teste.com', 'user_funcionario01', 'senha_funcionario01', '2199998888', '503032217', '33299400574', 'Endeço Funcionário01', '88833397', '2021-01-01');
INSERT INTO FUNCIONARIOS VALUES(NULL, 'nome funcionario02', 'M', '2000-05-20', 'email_funcionario02@teste.com', 'user_funcionario02', 'senha_funcionario02', '2133334444', '000333222', '03123578787', 'Endeço Funcionário02', '12344321', '2021-03-11');
SELECT * FROM FUNCIONARIOS;

INSERT INTO OCORRENCIAS VALUES(NULL, 2, 1, 'Sensores ativando e desativando o sistema de irrigação sem parar.', '2022-02-28','2022-02-28');
INSERT INTO OCORRENCIAS VALUES(NULL, 1, 1, 'Sensores desligando sozinhos.', '2022-02-28','2022-02-28');
INSERT INTO OCORRENCIAS VALUES(NULL, 1, 2, 'Sensores pegaram fogo', '2022-02-28','2022-02-28');
INSERT INTO OCORRENCIAS VALUES(NULL, 2, 2, 'Sensores desligando sozinhos.', '2022-02-28','2022-02-28');
SELECT * FROM OCORRENCIAS;
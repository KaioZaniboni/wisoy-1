-- -----------------------------------------------------
-- Cria e usa o banco de dados "wisoy".
-- -----------------------------------------------------
CREATE DATABASE wisoy;
USE wisoy;

drop database wisoy;

-- -----------------------------------------------------
-- A tabela LEADS sera responsável por armazenar as informações referentes as pessoas que acessaram o site e se cadastraram nesse campo, são os interessados.
-- -----------------------------------------------------
CREATE TABLE LEADS (
  ID_LEAD INT NOT NULL AUTO_INCREMENT,
  NOME_FANTASIA VARCHAR(60),
  EMAIL VARCHAR(60),
  TELEFONE VARCHAR(11),
  CNPJ VARCHAR(23),
  PRIMARY KEY (ID_LEAD))auto_increment = 100;

DESC LEADS;
-- -----------------------------------------------------
-- A tabela CLIENTES será responsável por armazenar todos os dados referentes ao cadastro de cada cliente.
-- -----------------------------------------------------
CREATE TABLE CLIENTES (
  ID_CLIENTE INT NOT NULL AUTO_INCREMENT,
  NOME_FANTASIA VARCHAR(60),
  TELEFONE VARCHAR(11),
  EMAIL VARCHAR (50),
  CPNJ VARCHAR(23),
  RAZAO_SOCIAL VARCHAR(50),
  DATA_CONTRATO DATE,
  PRIMARY KEY (ID_CLIENTE),
  FK_LEAD INT,
  FOREIGN KEY (FK_LEAD) REFERENCES LEADS (ID_LEAD)
)auto_increment = 15000;

DESC CLIENTES;

--------------------------------------------------------
-- A tabela USUARIOS_CLIENTES é responsável pelos login no sistema para demais verificações
--------------------------------------------------------

CREATE TABLE USUARIOS_CLIENTES(
ID_USUARIOS_CLIENTES INT PRIMARY KEY AUTO_INCREMENT,
LOGIN VARCHAR (35),
SENHA VARCHAR (20),
FK_CLIENTES INT,
FOREIGN KEY (FK_CLIENTES) REFERENCES CLIENTES (ID_CLIENTE));
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
  FOREIGN KEY (FK_CLIENTE)
  REFERENCES CLIENTES (ID_CLIENTE))auto_increment = 1;

DESC FAZENDAS;
-- -----------------------------------------------------
-- A tabela SENSORES irá conter todos os sensores que a wisoy já implantou, data de instalação e em qual fazenda se encontram.
-- -----------------------------------------------------
CREATE TABLE SENSORES (
  ID_SENSOR INT NOT NULL AUTO_INCREMENT,
  FK_FAZENDA INT NOT NULL,
  DATA_INSTALACAO DATE,
  SENSOR_XY VARCHAR (45),
  PRIMARY KEY (ID_SENSOR),
  FOREIGN KEY (FK_FAZENDA)
  REFERENCES FAZENDAS (ID_FAZENDA))auto_increment = 1;

DESC SENSORES;
-- -----------------------------------------------------
-- A tabela FUNCIONARIOS contera dados de todo quadro de funcionários WiSoy.
-- -----------------------------------------------------
CREATE TABLE COLABORADORES (
  ID_COLABORADORES INT NOT NULL AUTO_INCREMENT,
  NOME VARCHAR(60),
  SEXO CHAR(1),
  DATA_NASCIMENTO DATE,
  EMAIL VARCHAR(60),
  LOGIN VARCHAR(20),
  SENHA VARCHAR(20),
  TELEFONE VARCHAR(11),
  RG CHAR(9),
  CPF CHAR(11),
  ENDERECO VARCHAR(100) ,
  CARTEIRA_TRABALHO CHAR(8),
  DATA_ADMISSAO DATE,
  PRIMARY KEY (ID_COLABORADORES))auto_increment = 1000;

DESC FUNCIONARIOS;
-- -----------------------------------------------------
-- A tabela OCORRENCIAS tem o propósito de armazenar todas as ocorrências relacionadas ao serviços WiSoy relatadas por clientes.
-- -----------------------------------------------------
CREATE TABLE OCORRENCIAS (
  ID_OCORRENCIA INT NOT NULL AUTO_INCREMENT,
  FK_CLIENTE INT NOT NULL,
  FK_COLABORADORES INT NOT NULL,
  RELATO VARCHAR(280),
  DATA_OCORRENCIA DATE,
  PRIMARY KEY (ID_OCORRENCIA),
  FOREIGN KEY (FK_CLIENTE)
  REFERENCES CLIENTES (ID_CLIENTE),
  FOREIGN KEY (FK_COLABORADORES)
  REFERENCES COLABORADORES (ID_COLABORADORES))auto_increment = 1;

DESC OCORRENCIAS;
-- -----------------------------------------------------
-- A tabela DADOS tem a função de armazenar todos os dados coletados pelos sensores com a finalidade de utiliza-los na construção de gráficos, históricos, e outros serviços que serão oferecidos aos clientes.
-- -----------------------------------------------------
CREATE TABLE DADOS (
  ID_DADOS INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  FK_SENSOR INT NOT NULL,
  LEITURA_UMIDADE CHAR(6),
  LEITURA_DATA_HORA CHAR(16),
  FOREIGN KEY (FK_SENSOR)
  REFERENCES SENSORES (ID_SENSOR))auto_increment = 1;
  
  DESC DADOS;
-- -----------------------------------------------------
-- Inserts para testes
-- -----------------------------------------------------

INSERT INTO LEADS VALUES (NULL, 'Project Plant', 'contato@projectplant.com', '11987654321', '45433595000134'),
(NULL, 'Soja Mais', 'soja_mais@hotmail.com', '11912345678', '55345678000145'),
(NULL, 'Edinaldo Soja', 'edinal.soja@outlook.com.br', '11987774571', '98765432100015'),
(NULL, 'Agro Soja', 'contato@agrosoja.com.br', '11995154321', '45433984534143'),
(NULL, 'Agro Farm', 'agro_farm@gmail.com.br', '11955774205', '12345678000164');


SELECT * FROM LEADS;

DESC CLIENTES;

SELECT * FROM CLIENTES;

INSERT INTO CLIENTES VALUES 
(NULL, 'Project Plant', '11987654321', 'contato@projectplant.com', '45433595000134', 'João Plantação Agro', '2021-03-08',  100),
(NULL, 'Unilever', '11987880572', 'contato@projectplant.com', '61068276000104', 'Unilever LTDA', '2021-01-15',  null),
(NULL, 'Agro Farm', '11955774205', 'agro_farm@gmail.com.br', '12345678000164', 'Agro Farms Comercio de Graos Eireli', '2021-04-08',  104),
(NULL, 'Soja Hoje', '11966196606', 'soja_hoje@hotmail.com.br', '45455595000144', 'Soja Hoje LTDA', '2021-02-18',  null),
(NULL, 'Coca Cola', '11954320706', 'contato@cocacola.com.br', '45997418000153', 'COCA COLA INDUSTRIAS LTDA', '2020-12-23',  null);

SELECT * FROM CLIENTES;
DESC CLIENTES;

SELECT * FROM USUARIOS_CLIENTES;

INSERT INTO USUARIOS_CLIENTES VALUES 
(null, 'user1_plant', 'P@3507A', 15000), (null, 'user2_plant', 'P@5700A', 15000), (null, 'user3_plant', 'P#5503A', 15000),
(null, 'user1_lever', 'U@4433S', 15001), (null, 'user2_lever', 'U#3211S', 15001), (null, 'user3_lever', 'U@6671S', 15001),
(null, 'user1_farm', 'F@3257A', 15002), (null, 'user2_farm', 'F#7707A', 15002),
(null, 'user1_shoje', 'S@4302H', 15003), (null, 'user2_shoje', 'S#2002H', 15003), (null, 'user2_shoje', 'S@5552H', 15003),
(null, 'user1_cola', 'C@5504C', 15004), (null, 'user2_cola', 'C!2505C', 15004);

SELECT * FROM USUARIOS_CLIENTES;

SELECT * FROM CLIENTES;

INSERT INTO FAZENDAS VALUES
(NULL, 15000, 1000, 34, 'Rua Padre André'), (NULL, 15000, 90, 3, 'Rua Andrade Lopes'),
(NULL, 15001, 1500, 50 , 'Rua Fernando Moreira'),
(NULL, 15002, 400, 14, 'Rua Cornelius Frederick'), (NULL, 15002, 700, 24, 'Avenida Sapopemba'),
(NULL, 15003, 630, 21, 'Rua Engenheiro Alberto Nilman'),
(NULL, 15004, 10000, 334, 'Rua Coronel Armando');

SELECT * FROM FAZENDAS;
SELECT * FROM CLIENTES;

INSERT INTO SENSORES VALUES 
(NULL, 1, '2021-03-11', '86.1638, -80.4437'), (NULL, 2, '2021-03-16', '-57.0430, -157.2459'),
(NULL, 3, '2021-01-25', '42.1108, 7.6416'), (NULL, 4, '2021-03-11', '70.2003, -165.4415'),
(NULL, 5, '2021-03-11', '-75.3722, -176.6609'), (NULL, 6, '2021-02-28', '-34.8391, 157.6925'),
(NULL, 7, '2021-01-02', '22.5029, 136.9261');


SELECT * FROM SENSORES;

INSERT INTO DADOS VALUES (1, 'X: 77.77 Y: 33.33', 'LIGADO', '13.47%', '2022-28-03 14:55');

SELECT * FROM DADOS;

INSERT INTO COLABORADORES VALUES(NULL, 'Jonas Florencio', 'M', '2002-03-30', 'jonas_florencio@wisoy.com.br', 'jonas_wisoy', 
'Jo54@p12', '11955250037', '503032217', '33299400574', 'Rua Professor Otavio Fernandes', '88833397', '2021-02-01'),
(NULL, 'Amanda Fruteiro', 'F', '2002-01-07', 'amanda_fruteiro@wisoy.com.br', 'amanda_wisoy', 
'Am01#dsC', '11944064307', '243555719', '46955749916', 'Rua Enfermeira Luiza Alegreti', '77433397', '2021-02-01'),
(NULL, 'Matheus Vieck', 'M', '1998-02-13', 'matheus_vieck@wisoy.com.br', 'matheus_wisoy', 
'Ma37#f13', '11955250037', '530075995', '46933797734', 'Rua Soldado Peixoto', '74421388', '2021-02-01');

SELECT * FROM COLABORADORES;

INSERT INTO OCORRENCIAS VALUES
(NULL, 15000, 1000, 'Fazenda da Rua Andrade Lopes problema no sensor.', '2021-03-27'),
(NULL, 15000, 1000, 'Fazenda da Rua Padre André precisa trocar sensor 86.1638, -80.4437', '2021-03-28'),
(NULL, 15001, 1001, 'Fazenda da Rua Cornelius Frederick precisa de mais 2 sensores', '2021-04-10');

SELECT * FROM OCORRENCIAS;

------------------------------------------------------------
-- JOIN ABAIXO MOSTRA A RELAÇÃO DE LOGIN'S COM OS CLIENTES
------------------------------------------------------------

SELECT USUARIOS_CLIENTES.*, CLIENTES.NOME_FANTASIA FROM USUARIOS_CLIENTES JOIN CLIENTES 
ON CLIENTES.ID_CLIENTE = FK_CLIENTES;

------------------------------------------------------------
-- JOIN ABAIXO MOSTRA A RELAÇÃO DAS FAZENDAS COM SEUS CLIENTES
------------------------------------------------------------

SELECT FAZENDAS.*, CLIENTES.NOME_FANTASIA FROM FAZENDAS JOIN CLIENTES ON CLIENTES.ID_CLIENTE = FK_CLIENTE;


















 
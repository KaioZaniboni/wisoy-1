-- -----------------------------------------------------
-- Cria e usa o banco de dados "wisoy".
-- -----------------------------------------------------
CREATE DATABASE wisoy;
USE wisoy;

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
  PRIMARY KEY (ID_LEAD))auto_increment = 1;

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
)auto_increment = 15000;

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
  REFERENCES CLIENTES (ID_CLIENTE))auto_increment = 1;

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
  REFERENCES FAZENDAS (ID_FAZENDA))auto_increment = 1;

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
  PRIMARY KEY (ID_FUNCIONARIO))auto_increment = 10000;

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
  REFERENCES FUNCIONARIOS (ID_FUNCIONARIO))auto_increment = 1;

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
  REFERENCES SENSORES (ID_SENSOR))auto_increment = 1;
  
  DESC DADOS;
-- -----------------------------------------------------
-- Inserts para testes
-- -----------------------------------------------------

select * from leads;
desc leads;

INSERT INTO LEADS VALUES (NULL, 'Felipe Silva', 'M', 'felipe_silva@gmail.com', '11987654321', '45433595534'),
(NULL, 'Gabriel Pereira', 'M', 'gabriel_pereira@hotmail.com', '11912345678', '55345678000145'),
(NULL, 'Vanessa Almeida', 'F', 'vanessa.almeida@outlook.com.br', '11987774571', '98765432105'),
(NULL, 'Camila Nascimento', 'F', 'camila.nasc@gmail.com', '11995154321', '45433984534'),
(NULL, 'Andre Andrade', 'M', 'andre_andrade@gmail.com', '11955774205', '12345678000164');


SELECT * FROM LEADS;

DESC CLIENTES;

INSERT INTO CLIENTES VALUES 
(NULL, 'Felipe Silva', 'M', '1980-08-19', 'felipe_silva@gmail.com', 'felipe_soja1', 
'A34zt7@3', '11987654321', '590053339', '45433595534', 'Project Plant', 'Rua Engenheiro Marcelo Torres', '7582-000254', '2021-03-08', 1, 10000),
(NULL, 'Leandro Santos', 'M', '1977-02-23', 'leandro.santos@gmail.com', 'leandro_sssoja', 
'Z58tv9#1', '11987645678', '597755439', '43404695987', 'Soja Company', 'Rua Capitão Felipe Smith', '4872-025271', '2021-04-07', null, 10001),
(NULL, 'Vanessa Almeida', 'F', '1990-01-15', 'vanessa.almeida@outlook.com.br', 'vanessa_topo', 'T@@z7f41', '11987774571', 
'435994729', '98765432105', 'Topo Soja Plant', 'Rua Professora Amelia Nascimento', '3540-000759', '2021-02-13', 3, 10002),
(NULL, 'Andre Andrade', 'M', '1982-07-26', 'andre_andrade@gmail.com', 'andre07_world', 'W07#45ab#26', '11955774205', 
'756348167', '12345678000164', 'World Soja', 'Rua Encomendador Cornelius', '4000-305789', '2021-04-03', 5, 10002),
(NULL, 'Marco Oliveira', 'M', '1979-06-06', 'marco.oliveira@hotmail.com.br', 'marco_agro', 'Ma@552f37#', '11950427731', 
'675424719', '54816789000135', 'Soja Mais', 'Avenida Gomes Mendes', '7570-124994', '2021-01-03', null, 10000);


SELECT * FROM CLIENTES;
DESC CLIENTES;

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

INSERT INTO FUNCIONARIOS VALUES(NULL, 'Jonas Florencio', 'M', '2002-03-30', 'jonas_florencio@wisoy.com.br', 'jonas_wisoy', 
'Jo54@p12', '11955250037', '503032217', '33299400574', 'Rua Professor Otavio Fernandes', '88833397', '2021-02-01'),
(NULL, 'Amanda Fruteiro', 'F', '2002-01-07', 'amanda_fruteiro@wisoy.com.br', 'amanda_wisoy', 
'Am01#dsC', '11944064307', '243555719', '46955749916', 'Rua Enfermeira Luiza Alegreti', '88833397', '2021-02-01'),
(NULL, 'Matheus Vieck', 'M', '1998-02-13', 'matheus_vieck@wisoy.com.br', 'matheus_wisoy', 
'Ma37#f13', '11955250037', '503032217', '33299400574', 'Rua Soldado Peixoto', '88833397', '2021-02-01');

SELECT * FROM FUNCIONARIOS;
DESC FUNCIONARIOS;


INSERT INTO OCORRENCIAS VALUES(NULL, 2, 1, 'Sensores ativando e desativando o sistema de irrigação sem parar.', '2022-02-28','2022-02-28');
INSERT INTO OCORRENCIAS VALUES(NULL, 1, 1, 'Sensores desligando sozinhos.', '2022-02-28','2022-02-28');
INSERT INTO OCORRENCIAS VALUES(NULL, 1, 2, 'Sensores pegaram fogo', '2022-02-28','2022-02-28');
INSERT INTO OCORRENCIAS VALUES(NULL, 2, 2, 'Sensores desligando sozinhos.', '2022-02-28','2022-02-28');
SELECT * FROM OCORRENCIAS;


select * from clientes;
select * from funcionarios;
SELECT * FROM LEADS;

--                         A LINHA DE BAIXO MOSTRA
-- RELAÇÃO ENTRE OS FUNCIONARIOS QUE ATENDEM OS CLIENTES QUE FECHARAM CONTRATO COM A WISOY
--

select CLIENTES.*, FUNCIONARIOS.NOME FROM CLIENTES JOIN FUNCIONARIOS ON ID_FUNCIONARIO = FK_FUNCIONARIOS; 
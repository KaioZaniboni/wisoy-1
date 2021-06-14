-- ----------------------------------------
-- Criando Database Dungeons_e_Moranguetes
-- ----------------------------------------
create database  Dungeons_e_Moranguetes;
use  Dungeons_e_Moranguetes;
drop database Dungeons_e_Moranguetes;

-- ----------------------------------------
-- Criando Tabela Reinos
-- ----------------------------------------
create table Reinos (
idReino int primary key not null auto_increment,
NomeReino varchar (45),
Bioma varchar (45)
)auto_increment = 101;

-- ----------------------------------------
-- CRIANDO TABELA Boss_Criaturas
-- ----------------------------------------
create table Boss_Criaturas (
idBoss int primary key not null auto_increment,
NomeCriatura varchar (45),
DificuldadeCriatura varchar (45)
);

-- ----------------------------------------
-- Criando Tabela Itens
-- ----------------------------------------
create table Itens (
idItem int primary key not null auto_increment,
NomeItem varchar (45),
Valor_Venda double (10,2)
);

-- ----------------------------------------
-- Criando Tabela Personagens
-- ----------------------------------------
create table Personagens (
idPersonagem int primary key not null auto_increment,
NomePersonagem varchar (45),
Armadura varchar (45),
Classe varchar (45),
FK_Itens int,
foreign key (FK_Itens) references Itens (idItem)
);

-- ----------------------------------------
-- CRIANDO TABELA Batalha (Associativa)
-- ----------------------------------------
create table Batalhas (
FK_Personagens int,
foreign key (FK_Personagens) references Personagens (idPersonagem),
FK_Boss_Criaturas int,
foreign key (FK_Boss_Criaturas) references Boss_Criaturas (idBoss),
FK_Reinos int,
foreign key (FK_Reinos) references Reinos (idReino)
);

-- ----------------------------------------
-- Inserts das Tabelas
-- ----------------------------------------

insert into Reinos values 
(null, 'Reino Gelado', 'Neve'), (null, 'Reino do Fauno', 'Floresta'),
(null, 'Reino Lothlorien', 'Deserto') , (null, 'Reino do Inferno', 'Lava'), 
(null, 'Reino da Montanha do Bico de Corvo', 'Montanha'), (null, 'Reino Do Olho do Dragão', 'Caverna');

insert into Boss_Criaturas values 
(null, 'Asylum Demon', 'Difícil'), (null, 'Bell Gargoyle', 'Fácil'),
(null, 'Capra Demon', 'Muito Difícil') , (null, 'Chaos Witch Quelaag', 'Moderado'), 
(null, 'Gaping Dragon', 'Fácil'), (null, 'Iron Golem', 'Moderado');

insert into Itens values 
(null, 'Espada Longa', 100.00), (null, 'Potion', 45.00),
(null, 'Moranguete', 1000.00) , (null, 'Capacete', 20.00), 
(null, 'Cetro', 37.50), (null, 'Arco e Flecha', 300.45);

insert into Personagens values 
(null, 'Shelby Cobra', 'Armadura de Espinho', 'Arqueiro', 6), (null, 'Aleister Crowley', 'Capa de Agilidade', 'Mago', 5),
(null, 'Briana', 'Armadura de Madeira', 'Druida', 3) , (null, 'Lúthien Falleaf', 'Bota com Asas', 'Cavaleiro', 4), 
(null, 'Legolas Greenleaf', 'Arco de Ouro', 'Arqueiro', 6), (null, 'Garen', 'Escudo', 'Cavaleiro', 1) ,
(null, 'Mago Merlin', 'Chapéu Pontudo', 'Mago', 2);

insert into Batalhas values 
(1, 1, 101), (2, 1, 102),
(1, 2, 103), (2, 3, 104),
(3, 4, 105), (4, 5, 106),
(5, 6, 101), (6, 4, 102),
(7, 1, 103), (7, 3, 104),
(5, 2, 105), (1, 6, 106);


 -- -----------------------------------------------------------------
 /* 1- Selecione o nome de todos os personagens e os seus respectivos Itens - facil*/
 
 /* 2- Selecione todos os personagens cujo a classe seja 'Arqueiro' - facil*/
 
 /* 3- Selecione o nome da criatura e a dificuldade de todas que sejam Moderadas ou superiores - facil*/
 
 /* 4- Selecione quais são os diferentes valores das armas - medio*/
 
 /* 5- Selecione a soma do valor de todas as armas arredondando o resultado - medio*/
 
 /* 6- Selecione a média do valor das armas arredondando o resultado - medio*/
 
 /* 7- Selecione o reino, o personagem e a criatura cujo a batalha aconteça no Reino gelado - dificil*/
 
 /* 8- Selecione o reino, o personagem, a classe do personagem, o nome do item, e a criatura ordenado1 pelo Nome do Reino - dificil*/
 
 /* 9- Selecione o nome do personagem e a média do valor das armas arredondando o resultado por personagem, - dificil*/
 
 /* CORINGA- Selecione Nome do personagemm, o item e o nome da criatura cujo o personagem 'Mago Merlin' enfrentou, usando ***SUBSELECT*** */ 
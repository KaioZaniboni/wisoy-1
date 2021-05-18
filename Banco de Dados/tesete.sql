create database teste;
use teste;

create table usuario (
	id int primary key auto_increment,
    Nome varchar(45),
    Login varchar(45),
    senha varchar(45)
);

select * from usuario;

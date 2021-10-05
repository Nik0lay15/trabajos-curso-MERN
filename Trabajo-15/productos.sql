create database prueba;
use prueba;
create table item (
  	id int(40) auto_increment not null,
	nombre varchar(40) not null,
  	categoria varchar(10) not null,
  	stock int(30) unsigned,
  	primary key(id)
);

insert into item(nombre,categoria,stock) values("Fideos","Harina",20);
insert into item(nombre,categoria,stock) values("Leche","Lacteos",30);
insert into item(nombre,categoria,stock) values("Crema","Lacteos",15);
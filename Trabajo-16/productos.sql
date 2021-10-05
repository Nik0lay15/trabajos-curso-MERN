CREATE DATABASE prueba IF NOT EXISTS;

USE prueba;
CREATE TABLE item (
  	id int(40) auto_increment not null,
	nombre varchar(40) not null,
  	categoria varchar(10) not null,
  	stock int(30) unsigned,
  	primary key(id)
);

INSERT INTO item(nombre,categoria,stock) VALUES("Fideos","Harina",20);
INSERT INTO item(nombre,categoria,stock) VALUES("Leche","Lacteos",30);
INSERT INTO item(nombre,categoria,stock) VALUES("Crema","Lacteos",15);

SELECT * FROM item;

DELETE FROM item WHERE id = 1;

UPDATE item SET stock = 45 WHERE id = 2; 

SELECT * FROM item WHERE id != 1 AND stock = 45;
create database baodientu;
use baodientu;
create table category
(
	`cateID` INT(11) NOT NULL auto_increment,
    `cateName` nvarchar(50) NOT NULL,
    `postCounter` INT(11) ,
    `cateLink` varchar(500),
    constraint PK_CATEGORY PRIMARY KEY (`cateID`)
)

lock tables `category` write;
insert into `category` 	values (1,N'Hải sản',5,'hai-san.html');
insert into `category` values (2,N'Nông sản',6,'nong-san.html');
unlock tables;

drop table `category`;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root'
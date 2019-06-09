create database baodientu;
use baodientu;
create table category
(
	`cateID` INT(11) NOT NULL auto_increment,
    `cateName` nvarchar(50) NOT NULL,
    `postCounter` INT(11) ,
    `cateLink` varchar(500),
    constraint PK_CATEGORY PRIMARY KEY (`cateID`)
);


insert into `category` 	values (1,N'Hải sản',5,'hai-san.html');
insert into `category` values (2,N'Nông sản',6,'nong-san.html');

drop table `category`;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

create table tags
(
	`tagID` INT(11) NOT NULL auto_increment,
    `tagName` nvarchar(50) NOT NULL,
    `tagSoBaiViet` INT(11),
    `tagLink` varchar(500),
    constraint PK_TAGS primary key (`tagID`)
);
insert into `tags` values(1,N'Chuyện nhà nông',5,'chuyen-nha-nong.html');

create table posts
(
	`postID` INT(11) NOT NULL auto_increment,
    `postName` nvarchar(500) NOT NULL,
    `postStatus` varchar(50) NOT NULL,
    `postLink` varchar(500),
    constraint PK_POSTS primary key (`postID`)
);
insert into `posts` values(1,N'Chờ cơ hội tôm Việt Nam bức phá tại Mỹ','draft','sthsth');
insert into `posts` values(2,N'ststh','publish','sthsth');
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



create table writerusers
(
	`userID` int(11) NOT NULL auto_increment,
    `userName` nvarchar(50) NOT NULL,
    constraint PK_WRITERUSERS primary key (`userID`)
);
insert into `writerusers` values (1,N'Nguyễn Văn A');
insert into `writerusers` values (2,N'Nguyễn Văn B');

drop table editorusers	;
create table editorusers
(
	`userID` int(11) NOT NULL auto_increment,
    `userName` nvarchar(50) NOT NULL,
	`userCateID`  INT(11) NOT NULL,
    constraint PK_EDITORUSERS primary key (`userID`)
);
alter table editorusers
add constraint  fk_editorusers_category
foreign key (`userCateID`)
references category(`cateID`);
insert into `editorusers` values (1,N'Lê Đ',1);
insert into `editorusers` values (2,N'Lê Sds',2);




create table subscriberusers
(
	`userID` int(11) NOT NULL auto_increment,
    `userName` nvarchar(50) NOT NULL,
	`userExpiredDay`  date,
    constraint PK_subscriberusers primary key (`userID`)
);
insert into `subscriberusers` values (1,N'Lê Đ','2019-6-14');
insert into `subscriberusers` values (2,N'Lê Sds','2019-6-14');



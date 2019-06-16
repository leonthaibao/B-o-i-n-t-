create database baodientu;
use baodientu;
create table category
(
	`cateID` INT(11) NOT NULL auto_increment,
    `cateName` nvarchar(50) NOT NULL,
    `cateLink` varchar(500),
    constraint PK_CATEGORY PRIMARY KEY (`cateID`)
);

insert into `category` 	values (0,N'n/a','#');
insert into `category` 	values (1,N'Hải sản','hai-san');
insert into `category` values (2,N'Nông sản','nong-san');

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

create table tags
(
	`tagID` INT(11) NOT NULL auto_increment,
    `tagName` nvarchar(50) NOT NULL,
    `tagLink` varchar(500),
    constraint PK_TAGS primary key (`tagID`)
);
insert into `tags` values(1,N'Chuyện nhà nông','chuyen-nha-nong.html');


create table post
(
	`postID`  INT(11) NOT NULL auto_increment,
    `postAnhTieuDe` varchar(50) not NULL,
    `postTieuDe` nvarchar(500) NOT NULL,
    `postTomTat` nvarchar(1000) NOT NULL,
    `postNoiDung` nvarchar(15000) NOT NULL,
    `postChuyenMucID` INT(11) NOT NULL,
    `postTagID`  INT(11) NOT NULL,
    `postTrangThaiID` varchar(10) NOT NULL, 
    `postLuotView` INT(11) NOT NULL,
    `postHangBaiViet` nvarchar(50),
    `postNgayDang` date,
    `postWriterID` INT(11) NOT NULL,
    `postLyDoTuChoi` nvarchar(500),
    `postNgayXuatBan` date, 
    constraint PK_POST primary key (`postID`)
);

alter table post
add constraint  fk_post_category
foreign key (`postChuyenMucID`)
references category(`cateID`);
alter table post
add constraint  fk_post_tags
foreign key (`postTagID`)
references tags(`tagID`);
alter table post
add constraint  fk_post_users
foreign key (`postWriterID`)
references users(`userID`);



create table users
(
	`userID` int(11) NOT NULL auto_increment,
    `userName` varchar(16) NOT NULL,
    `userPassword` varchar(16) NOT NULL,
    `userType` int(11) NOT NULL,
    `userCateID` int(11) NOT NULL,
     constraint PK_USERS primary key (`userID`)  
);

insert into users values (1,'Nono','123',1,0);
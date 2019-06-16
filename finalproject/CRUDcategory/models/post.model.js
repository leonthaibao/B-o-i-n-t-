var db= require('../untils/catedb');
module.exports = {
    all: ()=>{
        return db.load('select * from post');
    },
    single: id=>{
        return db.load(`select * from post where postID = ${id}`);
    },
    add: (entity)=>{
        return db.add('post',entity);
    },
    update: (entity)=>{
        return db.update('post','postID',entity);
    },
    delete: (id)=>{
        return db.delete('post','postID',id);
    },
    loadtwotable: () =>{
        return db.load2table(`SELECT c.cateID, c.cateName FROM category c ;SELECT t.tagID, t.tagName FROM tags t `)
    },
    listCDDLoad: (writerid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where p.postTrangThaiID='CDD' and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`)
    },
    singleCDDLoad: (postid, writerid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where  p.postID=${postid} and p.postTrangThaiID='CDD' and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`);
    },
    listDDDLoad: (writerid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where p.postTrangThaiID='DDD' and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`)
    },
    singleDDDLoad: (postid, writerid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where  p.postID=${postid} and p.postTrangThaiID='DDD' and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`);
    },
    listDXBLoad: (writerid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where p.postTrangThaiID='DXB' and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`)
    },
    singleDXBLoad: (postid, writerid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where  p.postID=${postid} and p.postTrangThaiID='DXB' and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`);
    },
    listBTCLoad: (writerid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where p.postTrangThaiID='BTC' and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`)
    },
    singleBTCLoad: (postid, writerid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where  p.postID=${postid} and p.postTrangThaiID='BTC' and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`);
    },
    loadthreetable:(postid,writerid)=>{
        return db.load3table(`SELECT c.cateID, c.cateName FROM category c ;SELECT t.tagID, t.tagName FROM tags t ; SELECT * FROM post p, category c, tags t where  p.postID=${postid}  and p.postWriterID=  ${writerid} and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`)
    }
}
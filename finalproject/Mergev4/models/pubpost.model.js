var db= require('../utils/catedb');
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
    loadDXBpost: ()=>{
        return db.load(`select *,date_format(postNgayXuatBan,'%Y-%m-%d') as ngayxuatban from post p,tags t, category c where t.tagID=p.postTagID and p.postChuyenMucID = c.cateID and p.postTrangThaiID='DXB' or ( postTrangThaiID='DDD' and  postNgayXuatBan <= curdate());select c.cateID, c.cateName, count(*) as SLBVtheocate from category c, post p where c.cateID = p.postChuyenMucID group by c.cateID, c.cateName;select t.tagID, t.tagName, count(*) as SLBVtheotag from tags t, post p where p.postTagID = t.tagID  group by t.tagID, t.tagName`);
    },
    singleLoad: (postid)=>{
        return db.load(`SELECT * FROM post p, category c, tags t where  p.postID=${postid}  and p.postTagID = t.tagID and p.postChuyenMucID = c.cateID`);
    },
    pageByPost: ( limit, offset) => {
        return db.load(`select *,date_format(postNgayXuatBan,'%Y-%m-%d') as ngayxuatban from post p,tags t, category c where t.tagID=p.postTagID and p.postChuyenMucID = c.cateID and p.postTrangThaiID='DXB' or ( postTrangThaiID='DDD' and  postNgayXuatBan <= curdate()) limit ${limit} offset ${offset};select c.cateID, c.cateName, count(*) as SLBVtheocate from category c, post p where c.cateID = p.postChuyenMucID and p.postTrangThaiID='DXB' or ( postTrangThaiID='DDD' and  postNgayXuatBan <= curdate()) group by c.cateID, c.cateName;select t.tagID, t.tagName, count(*) as SLBVtheotag from tags t, post p where p.postTagID = t.tagID and p.postTrangThaiID='DXB' or ( postTrangThaiID='DDD' and  postNgayXuatBan <= curdate()) group by t.tagID, t.tagName`);
    },
    
    countByPost: () => {
        return db.load(`select count(*) as total from post where postTrangThaiID='DXB' or(postTrangThaiID='DDD' and  postNgayXuatBan <= curdate())`);
    },
    pageByPosttheocategory: (categoryid, limit, offset) => {
        return db.load(`select *,date_format(postNgayXuatBan,'%Y-%m-%d') as ngayxuatban from post p,tags t, category c where  p.postChuyenMucID=${categoryid} and t.tagID=p.postTagID and p.postChuyenMucID = c.cateID and p.postTrangThaiID='DXB' or ( postTrangThaiID='DDD' and  postNgayXuatBan <= curdate()) limit ${limit} offset ${offset};select c.cateID, c.cateName, count(*) as SLBVtheocate from category c, post p where  c.cateID = p.postChuyenMucID and p.postTrangThaiID='DXB' or ( postTrangThaiID='DDD' and  postNgayXuatBan <= curdate()) group by c.cateID, c.cateName;select t.tagID, t.tagName, count(*) as SLBVtheotag from tags t, post p where p.postTagID = t.tagID and p.postTrangThaiID='DXB' or ( postTrangThaiID='DDD' and  postNgayXuatBan <= curdate()) group by t.tagID, t.tagName`);
    },
    
    countByPosttheocategory: (categoryid) => {
        return db.load(`select count(*) as total from post where postChuyenMucID=${categoryid} and postTrangThaiID='DXB' or(postTrangThaiID='DDD' and  postNgayXuatBan <= curdate())`);
    },
    pageByPosttheotag: (tagid, limit, offset) => {
        return db.load(`select *,date_format(postNgayXuatBan,'%Y-%m-%d') as ngayxuatban from post p,tags t, category c where  p.postTagID=${tagid} and t.tagID=p.postTagID and p.postChuyenMucID = c.cateID and p.postTrangThaiID='DXB' or ( postTrangThaiID='DDD' and  postNgayXuatBan <= curdate()) limit ${limit} offset ${offset};select c.cateID, c.cateName, count(*) as SLBVtheocate from category c, post p where  c.cateID = p.postChuyenMucID and p.postTrangThaiID='DXB' or ( postTrangThaiID='DDD' and  postNgayXuatBan <= curdate()) group by c.cateID, c.cateName;select t.tagID, t.tagName, count(*) as SLBVtheotag from tags t, post p where p.postTagID = t.tagID and p.postTrangThaiID='DXB' or ( postTrangThaiID='DDD' and  postNgayXuatBan <= curdate()) group by t.tagID, t.tagName`);
    },
    
    countByPosttheotag: (tagid) => {
        return db.load(`select count(*) as total from post where postTagID=${tagid} and postTrangThaiID='DXB' or(postTrangThaiID='DDD' and  postNgayXuatBan <= curdate())`);
    },
}
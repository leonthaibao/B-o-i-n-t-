var db= require('../untils/catedb');
module.exports = {
    all: ()=>{
        return db.load('select * from tags');
    },
    single: id=>{
        return db.load(`select * from tags where tagID = ${id}`);
    },
    add: (entity)=>{
        return db.add('tags',entity);
    },
    update: (entity)=>{
        return db.update('tags','tagID',entity);
    },
    delete: (id)=>{
        return db.delete('tags','tagID',id);
    },
    pageByCat: ( limit, offset) => {
        return db.load(`select t.tagID, t.tagName, count(*) as SLBV from tags t, post p where p.postTagID = t.tagID  group by t.tagID, t.tagName limit ${limit} offset ${offset}`);
    },
    
    countByCat: () => {
        return db.load(`select count(*) as total from tags`);
    },
}
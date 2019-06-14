var db= require('../untils/catedb');
module.exports = {
    all: ()=>{
        return db.load('select * from category');
    },
    single: id=>{
        return db.load(`select * from category where cateID = ${id}`);
    },
    add: (entity)=>{
        return db.add('category',entity);
    },
    update: (entity)=>{
        return db.update('category','cateID',entity);
    },
    delete: (id)=>{
        return db.delete('category','cateID',id);
    },
    selectname:()=>{
        return db.load('select cateID,cateName from category');
    },
    pageByCat: ( limit, offset) => {
        return db.load(`select * from category limit ${limit} offset ${offset}`);
    },
    
    countByCat: () => {
        return db.load(`select count(*) as total from category`);
    },
}
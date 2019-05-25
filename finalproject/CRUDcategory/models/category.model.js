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
    }
}
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
    }
}
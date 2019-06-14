var db= require('../untils/catedb');
module.exports = {
    all: ()=>{
        return db.load('select * from writerusers');
    },
    single: id=>{
        return db.load(`select * from writerusers where userID = ${id}`);
    },
    add: (entity)=>{
        return db.add('writerusers',entity);
    },
    update: (entity)=>{
        return db.update('writerusers','userID',entity);
    },
    delete: (id)=>{
        return db.delete('writerusers','userID',id);
    },
    pageByCat: ( limit, offset) => {
        return db.load(`select * from writerusers limit ${limit} offset ${offset}`);
    },
    
    countByCat: () => {
        return db.load(`select count(*) as total from writerusers`);
    },
  
}
var db= require('../untils/catedb');
module.exports = {
    all: ()=>{
        return db.load('select * from subscriberusers');
    },
    single: id=>{
        return db.load(`select * from subscriberusers where userID = ${id}`);
    },
    add: (entity)=>{
        return db.add('subscriberusers',entity);
    },
    update: (entity)=>{
        return db.update('subscriberusers','userID',entity);
    },
    delete: (id)=>{
        return db.delete('subscriberusers','userID',id);
    },
    pageByCat: ( limit, offset) => {
        return db.load(`select * from subscriberusers limit ${limit} offset ${offset}`);
    },
    
    countByCat: () => {
        return db.load(`select count(*) as total from subscriberusers`);
    },
}
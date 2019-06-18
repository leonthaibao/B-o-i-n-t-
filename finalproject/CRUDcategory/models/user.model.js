var db= require('../untils/catedb');
module.exports = {
    all: ()=>{
        return db.load('select * from users');
    },
    single: id=>{
        return db.load(`select * from users where userID = ${id}`);
    },
    add: (entity)=>{
        return db.add('users',entity);
    },
    update: (entity)=>{
        return db.update('users','userID',entity);
    },
    delete: (id)=>{
        return db.delete('users','userID',id);
    },
    pageByCat: (usertype, limit, offset) => {
        return db.load(`select * from users where userType =${usertype} limit ${limit} offset ${offset}`);
    },
    
    countByCat: (usertype) => {
        return db.load(`select count(*) as total from users  where userType =${usertype}`);
    },
    
    multiidname: (id) =>{
        return db.load(`select * from users,category where users.userID = ${id}`);
    },
    
}
var db= require('../untils/catedb');
module.exports = {
    all: ()=>{
        return db.load('select * from editorusers');
    },
    single: id=>{
        return db.load(`select * from editorusers where userID = ${id}`);
    },
    add: (entity)=>{
        return db.add('editorusers',entity);
    },
    update: (entity)=>{
        return db.update('editorusers','userID',entity);
    },
    delete: (id)=>{
        return db.delete('editorusers','userID',id);
    },
    multiidname: id =>{
        return db.load(`select * from editorusers,category where editorusers.userID = ${id}`);
    },
    pageByCat: ( limit, offset) => {
        return db.load(`select * from editorusers limit ${limit} offset ${offset}`);
    },
    
    countByCat: () => {
        return db.load(`select count(*) as total from editorusers`);
    },
}
var db = require('../utils/catedb');

module.exports = {
  all: () => {
    return db.load('select * from adminuser');
  },

  single: id => {
    return db.load(`select * from adminuser where userID = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(`select * from adminuser where userName = '${userName}'`);
  },

  add: entity => {
    return db.add('adminuser', entity);
  },

  update: entity => {
    //var id = entity.ID;
    //delete entity.ID;
    return db.update('adminuser', 'userID', entity);
  },

  delete: id => {
    return db.delete('adminuser', 'userID', id);
  },
  pageByCat: (usertype, limit, offset) => {
    return db.load(`select * from adminuser where userType =${usertype} limit ${limit} offset ${offset}`);
  },

  countByCat: (usertype) => {
      return db.load(`select count(*) as total from adminuser  where userType =${usertype}`);
  },

  multiidname: (id) =>{
      return db.load(`select * from adminuser,category where adminuser.userID = ${id}`);
  },

};

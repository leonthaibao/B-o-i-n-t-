var db = require('../utils/catedb');

module.exports = {
  all: () => {
    return db.load('select * from users');
  },

  single: id => {
    return db.load(`select * from users where ID = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(`select * from users where Username = '${userName}';select * from adminuser where userName = '${userName}' `);
  },
  singleByUserNameRegis: userName => {
    return db.load(`select * from users where Username = '${userName}'`);
  },
  add: entity => {
    return db.add('users', entity);
  },

  update: entity => {
    //var id = entity.ID;
    //delete entity.ID;
    return db.update('users', 'ID', entity);
  },

  delete: id => {
    return db.delete('users', 'ID', id);
  },
  pageByCat: ( limit, offset) => {
      return db.load(`select *,date_format(BDay,'%Y-%m-%d') as ngaysinh from users limit ${limit} offset ${offset}`);
  },
  
  countByCat: () => {
      return db.load(`select count(*) as total from users`);
  },
  
  multiidname: (id) =>{
      return db.load(`select * from users,category where users.userID = ${id}`);
  },
};

var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from postdetail');
  },

  single: id => {
    return db.load(`select * from postdetail where idPost = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(`select * from users where Name = '${userName}'`);
  },

  add: entity => {
    return db.add('users', entity);
  },

  update: entity => {
      var a = entity.chuyenMuc;
    return db.update('postdetail', 'chuyenMuc', entity,a);
  },

  delete: id => {
    return db.delete('users', 'ID', id);
  }
};

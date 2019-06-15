var db = require('../utils/db');

module.exports = {
  all: () => {
    
    return db.load(`select * from postdetail `);
  },
  // all2: () => {
  //   var statE = 'đang chờ',
  //   return db.load(`select * from postdetail where trangThai = ${stateE}`);
  // },

  single2: id => {
    return db.load(`select * from postdetail where trangThai = '${id}'`);
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
    return db.update('postdetail','idPost', entity);
  },
  updateDenied: entity => {
    var a = entity.chuyenMuc;
  return db.update('postdetail', 'idPost', entity);
},

  delete: id => {
    return db.delete('users', 'ID', id);
  }
};

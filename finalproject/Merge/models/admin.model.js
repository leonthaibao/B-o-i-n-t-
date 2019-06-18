var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from admin');
  },

  single: id => {
    return db.load(`select * from admin where ID = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(`select * from admin where Username = '${userName}'`);
  },

  add: entity => {
    return db.add('admin', entity);
  },

  update: entity => {
    //var id = entity.ID;
    //delete entity.ID;
    return db.update('admin', 'ID', entity);
  },

  delete: id => {
    return db.delete('admin', 'ID', id);
  }
};

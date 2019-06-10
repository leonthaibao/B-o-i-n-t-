var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from users');
  },

  single: id => {
    return db.load(`select * from users where ID = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(`select * from users where Name = '${userName}'`);
  },

  add: entity => {
    return db.add('users', entity);
  },

  update: entity => {
    var id = entity.ID;
    delete entity.ID;
    return db.update('users', 'ID', entity, id);
  },

  delete: id => {
    return db.delete('users', 'ID', id);
  }
};

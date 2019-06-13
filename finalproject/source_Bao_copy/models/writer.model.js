var db = require('../utils/db');

module.exports = {
    add: (a,entity) => {
        //return db.add('editor1', 'txtTitle', 'txtSum', 'cmbCM', 'txtTag', entity);
        return db.add('editor1', entity);
    }
};
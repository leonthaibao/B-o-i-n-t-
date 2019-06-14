var db = require('../utils/db');

module.exports = {
    add: entity => {
        //return db.add('editor1', 'txtTitle', 'txtSum', 'cmbCM', 'txtTag', entity);
        return db.add('a', entity);
    }
};
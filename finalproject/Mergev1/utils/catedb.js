var mysql      = require('mysql');

var createConnection = () =>{
    return mysql.createConnection({
        host     : 'localhost',
        port     :   3306,
        user     : 'root',
        password : '',//'root',
        database : 'baodientu',
        debug: false,
        multipleStatements: true
      });
}
module.exports = {
    load2table: sql=>{
        return new Promise((resolve,reject)=>{
            var connection= createConnection();
            connection.connect();   
            connection.query(sql, [2, 1], function(error, results, fields) {
                if (error) {
                    reject(error);
                }
                else{   
                    resolve(results);
                }
                connection.end();
            });
            
        })

    },
    load3table: sql=>{
        return new Promise((resolve,reject)=>{
            var connection= createConnection();
            connection.connect();   
            connection.query(sql, [3, 1], function(error, results, fields) {
                if (error) {
                    reject(error);
                }
                else{   
                    resolve(results);
                }
                connection.end();
            });
            
        })

    },
    load4table: sql=>{
        return new Promise((resolve,reject)=>{
            var connection= createConnection();
            connection.connect();   
            connection.query(sql, [4, 1], function(error, results, fields) {
                if (error) {
                    reject(error);
                }
                else{   
                    resolve(results);
                }
                connection.end();
            });
            
        })

    },
    load: sql=>{
        return new Promise((resolve,reject)=>{
            var connection= createConnection();
            connection.connect();   
            connection.query(sql, function (error, results, fields) {
                if (error) {
                    reject(error);
                }
                else{   
                    resolve(results);
                }
                connection.end();
            });
            
        })

    },
    add: (tableName,entity)=>{
        return new Promise((resolve,reject)=>{
            var sql = `insert into ${tableName} set ?`;
            var connection= createConnection();
            connection.connect();   
            connection.query(sql,entity, function (error,value) {
                if (error) {
                    reject(error);
                }
                else{   
                    resolve(value.insertID);
                }
                connection.end();
            });
            
        })

    },
    update: (tableName,idField,entity)=>{
        return new Promise((resolve,reject)=>{
            var id = entity[idField];
            delete entity[idField];

            var sql = `update ${tableName} set ? where ${idField}=?`;
            var connection= createConnection();
            connection.connect();   
            connection.query(sql,[entity,id], (error,value) => {
                if (error) {
                    reject(error);
                }
                else{   
                    resolve(value.changedRows);
                }
                connection.end();
            });
            
        })

    },
    delete: (tableName,idField,id)=>{
        return new Promise((resolve,reject)=>{

            var sql = `delete from ${tableName} where ${idField}=?`;
            var connection= createConnection();
            connection.connect();   
            connection.query(sql,id, (error,value) => {
                if (error) {
                    reject(error);
                }
                else{   
                    resolve(value.affectedRows);
                }
                connection.end();
            });
            
        })

    }
}

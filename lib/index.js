const rethinkDB = require('rethinkdb');
const consola = require('consola');

// convert the connection to a pool
rethinkDB.connect({
    host: process.env.RETHINK_DB_HOST,
    port: +process.env.RETHINK_DB_PORT || 28015,
    db: process.env.DATABASE
})
    .then(connection  => {
        module.exports.find = table => new Promise(async (resolve,reject) => {
            try {
                let data = await rethinkDB.table(table).run(connection).then(cursor => cursor.toArray());
                resolve(data);
            }catch(error){
                reject(error);
            }
        });

        module.exports.findBy = (table, row, expectedValue) => new Promise((resolve, reject) => {
            rethinkDB.table(table).filter(
                rethinkDB.row(row).eq(expectedValue)
            ).run(connection, (err, cursor) => {
                if (err)
                    reject(err);
                
                cursor.toArray((err, result) => {
                    if (err)
                        reject(err);
                    resolve(result);
                })
            })
        });

        // CREATE METHOD
        module.exports.create = (table,data) => new Promise(async (resolve,reject) => {
            try {
                let results = await rethinkDB.table(table).insert(data).run(connection);
                resolve(results);
            }catch(error){
                reject(error);
            }
        })
    })
    .catch(error => {
        consola.error(error);
    })
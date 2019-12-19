let sqlite3 = require('sqlite3');
let sqlite_util = {
    create_db: async (db_path) => {
        return new Promise ((resolve,reject) => {
            let db = new sqlite3.Database(db_path, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve(db);
            });
        });
    },

    run: async (db,query,param) => {
        return new Promise ((resolve,reject) => {
            db.run(query,param,(err)=>{
                if(err){
                    return reject(err);
                }
                resolve({id:this.lastID});
            });
        });
    },

    get: async (db,query,param) => {
        return new Promise((resolve, reject)=> {
            db.get(query, param, (err, result) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(result);
                }
            })
        });
    },

    all: async (db,query,param)=> {
        return new Promise((resolve,reject)=>{
            db.all(query, param, (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    resolve(results);
                }
            })
        });
    },

    close: (db) => {
        return new Promise((resolve,reject)=>{
            db.close((err) => {
                if (err) {
                    reject(err);
                }
                resolve({success:true});
            });
        });
    },

    finalize : (db) => {
        return new Promise((resolve,reject)=>{
            db.finalize((err) => {
                if (err) {
                    reject(err);
                }
                resolve({success:true});
            });
        });
    },

    prepare: (db,query) => {
        return db.prepare(query);
    }
};

module.exports = sqlite_util;
let fs = require("fs");
let path = require("path");
let util = {
    copy: async (source,dest) => {
        return new Promise((resolve, reject)=>{
            fs.copyFile(source, dest, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    },

    deleteDirContents : async (dir) => {
        return new Promise(function (resolve, reject) {
            fs.access(dir, function (err) {
                if (err) {
                    return reject(err);
                }
                fs.readdir(dir, function (err, files) {
                    if (err) {
                        return reject(err);
                    }
                    Promise.all(files.map(function (file) {
                        return util.deleteFile(path.join(dir, file));
                    })).then(function () {
                        resolve();
                    }).catch(reject);
                });
            });
        });
    },

    deleteFile: async (filePath) => {
        return new Promise(function (resolve, reject) {
            fs.lstat(filePath, function (err, stats) {
                if (err) {
                    return reject(err);
                }
                if (stats.isDirectory()) {
                    resolve(util.deleteDir(filePath));
                } else {
                    fs.unlink(filePath, function (err) {
                        if (err) {
                            return reject(err);
                        }
                        resolve();
                    });
                }
            });
        });
    },

    deleteDir: async (dir) => {
        return new Promise(function (resolve, reject) {
            fs.access(dir, function (err) {
                if (err) {
                    return reject(err);
                }
                fs.readdir(dir, function (err, files) {
                    if (err) {
                        return reject(err);
                    }
                    Promise.all(files.map(function (file) {
                        return util.deleteFile(path.join(dir, file));
                    })).then(function () {
                        fs.rmdir(dir, function (err) {
                            if (err) {
                                return reject(err);
                            }
                            resolve();
                        });
                    }).catch(reject);
                });
            });
        });
    }
};



module.exports = util;
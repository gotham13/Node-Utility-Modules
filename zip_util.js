const archiver = require('archiver');
const fs = require('fs');

let zip_util = {
    archive_init: (level) => {
        return archiver('zip',{zlib:{level:level}});
    },

    add_file: (archive, file_path, file_name) => {
        archive.file(file_path, {name:file_name});
    },

    finalize: async (archive, dest_path) => {
        const stream = fs.createWriteStream(dest_path);
        return new Promise((resolve, reject) => {
            archive.on('error', err => reject(err)).pipe(stream);
            stream.on('close', () => resolve({success:true}));
            archive.finalize();
        });
    }
};

module.exports = zip_util;
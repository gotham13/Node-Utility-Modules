let checksum = require("checksum");
let checksum_util = {
    find_checksum: async (file_path, algo) => {
        return new Promise((resolve, reject)=>{
            checksum.file(file_path, {algorithm: algo}, (err, sum) => {
               if(err){
                   return reject(err);
               }
               resolve(sum)
            });
        });
    }
};

module.exports = checksum_util;
let request = require("request");
let req_util = {
    get: async (url) => {
        return new Promise((resolve, reject) => {
            request.get(url, (err, resp, body)=>{
                if (!err && resp.statusCode === 200)
                    resolve(body);
                return reject(err);
            });
        });
    },

    post : async (url,data) => {
        return new Promise((resolve, reject) => {
            request.post({url:url,form:data}, (err, resp, body)=>{
                if (!err && resp.statusCode === 200)
                    resolve(body);
                return reject(err);
            });
        });
    }
};

module.exports = req_util;
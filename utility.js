let utility_functions = {};

utility_functions.checkSignIn = function (req) {
    if (req.session.user){
        return req.ip === req.session.user.ip
        //If session exists, proceed to page
    } else {
        return false;
    }
};

utility_functions.connection = async (req) => {
    return new Promise((resolve, reject) => {
        req.getConnection((err, connection) => {
            if (err) {
                return reject(err);
            }
            else {
                connection.make_query = async (sql, params = []) => {
                    return new Promise((resolve, reject) => {
                        connection.query(sql, params, function (error, results) {
                            if (error) {
                                return reject(error);
                            } else {
                                resolve(results);
                            }
                        });
                    })
                };
                resolve(connection);
            }
        });
    })
};
module.exports = utility_functions;
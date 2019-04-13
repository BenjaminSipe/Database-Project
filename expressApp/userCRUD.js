const dbInfo = require('./dbInfo');

exports.readUsers = function() {
    return new Promise( (resolve, reject) => {
    dbInfo.pool.query('CALL usp_ReadUsers()', function (err, rows, fields) {
        if (err)
          reject('{"error":"No Users Found"}');
        else
          resolve(rows[0])
      });
  })}
const dbInfo = require('./dbInfo');

exports.readBooks = function() {
    return new Promise( (resolve, reject) => {
    dbInfo.pool.query('CALL usp_ReadBooks()', function (err, rows, fields) {
        if (err)
          reject('Something went wrong.');
        else
          resolve(rows[0])
      });
  })}
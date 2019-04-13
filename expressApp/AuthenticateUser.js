const dbInfo = require('./dbInfo');

exports.authenticateUser = function(email, password) {
  return new Promise( (resolve, reject) => {
  dbInfo.pool.query('CALL usp_AuthUser(? ? )', email, password, function (err, rows, fields) {
      if (err)
        reject('Something went wrong.');
      else
        resolve(rows[0])
    });
})}

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

  exports.createUser = function(obj) {
    return new Promise( (resolve, reject) => {
        dbInfo.pool.query('CALL usp_CreateUser( ?, ?, ?, ?, ? )', [obj.name, obj.password, obj.homePhone, obj.workPhone, obj.email], function (err, rows, fields) {
        if (err)
          reject('{"error":"No Users Found"}');
        else {
            resolve(rows[0]);
        }
    });
  })}

  exports.authUser = function(email, password) {
    return new Promise( (resolve, reject) => {
    dbInfo.pool.query('CALL usp_AuthUser( ? , ? )', [email, password] , function (err, rows, fields) {
        if (err)
          reject('Something went wrong.');
        else
          resolve(rows[0])
      });
  })}
  
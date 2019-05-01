const dbInfo = require('./dbInfo');

exports.updateUserLoginInfo = function (body) {
  return new Promise((resolve, reject) => {
    let s;
    if (body[2] == "password") {
      s = "CALL usp_updateUserPassword( ?, ?)";
    } else {
      s = "CALL usp_updateUserEmail( ?, ?)"
    }
    let y = body.pop();
    dbInfo.pool.query(s, body, function (err, rows, fields) {
      if (err)
        reject(`{"error":"${y} could not be updated"}`);
      else
        resolve("Success");
    });
    resolve(body);
  })
}


exports.readUsers = function () {
  return new Promise((resolve, reject) => {
    dbInfo.pool.query('CALL usp_ReadUsers()', function (err, rows, fields) {
      if (err)
        reject('{"error":"No Users Found"}');
      else {
        //console.log(rows[0]);
        resolve(rows[0])
    }});
  })
}

exports.readUser = function (id) {
  return new Promise((resolve, reject) => {
    dbInfo.pool.query(`CALL usp_ReadUser( ${id} )`, function (err, rows, fields) {
      if (err) {
        reject('{"error":"No Users Found"}');
      } else
        resolve(rows[0])
    });
  })
}
exports.createUser = function (obj) {
  return new Promise((resolve, reject) => {
    dbInfo.pool.query('CALL usp_CreateUser( ?, ?, ?, ?, ? )', [obj.name, obj.password, obj.homePhone, obj.workPhone, obj.email], function (err, rows, fields) {
      if (err)
        reject('{"error":"No Users Found"}');
      else {
        resolve(rows[0]);
      }
    });
  })
}

exports.authUser = function (email, password) {
  return new Promise((resolve, reject) => {
    dbInfo.pool.query('CALL usp_AuthUser( ? , ? )', [email, password], function (err, rows, fields) {
      if (err)
        reject('{"error":"InCorrect Info"}');
      else
        resolve(rows[0])
    });
  })
}
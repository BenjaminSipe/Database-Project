const test = require('./dbconnectiontest');
var mysql = require('mysql');
var connection = mysql.createConnection(test.connectionString);
;
exports.readCategories =  function(ret) {
 var ret = [];
 connection.query('CALL usp_ReadCategories()', function (err, rows, fields) {
    if (err) throw err
    for (var i of rows[0]) {
      ret.push(i);
    }
    console.log('for loop');
    console.log(ret);
  })
  console.log('return');
  console.log(ret);
  return ret;
}

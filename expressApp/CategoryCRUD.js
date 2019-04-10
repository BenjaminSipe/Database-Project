const dbInfo = require('./dbInfo');

exports.readCategories = function() {
  return new Promise( (resolve, reject) => {
  dbInfo.pool.query('CALL usp_ReadCategories()', function (err, rows, fields) {
      if (err)
        reject('Something went wrong.');
      else
        resolve(rows[0])
    });
})}

exports.readCategory = function(index) {
  return new Promise( (resolve, reject) => {
  dbInfo.pool.query('CALL usp_ReadCategory( ? )', index, function (err, rows, fields) {
      if (err)
        reject('Something went wrong.');
      else
        resolve(rows[0])
    });
})}

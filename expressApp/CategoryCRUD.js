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
exports.readCategoryBook = function(index) {
  return new Promise( (resolve, reject) => {
  dbInfo.pool.query('CALL usp_ReadCategoryBook( ? )', index, function (err, rows, fields) {
      if (err)
        reject('Something went wrong.');
      else
        resolve(rows[0])
    });
})}
exports.createCategory = function(newCategory) {
  //console.log(newCategory);
  return new Promise((resolve, reject) => {
    dbInfo.pool.query('CALL usp_CreateCategory("'+newCategory.newCategoryName+'")', function (err, rows, fields) {
      if (err) reject(err);
      else resolve(rows[0]);
    });
  })
    
}

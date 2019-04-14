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

  exports.readAuthors = function() {
    return new Promise( (resolve, reject) => {
    dbInfo.pool.query('CALL usp_ReadAuthors()', function (err, rows, fields) {
        if (err)
          reject('Something went wrong.');
        else
          resolve(rows[0])
      });
  })}
  exports.readFormats = function() {
    return new Promise( (resolve, reject) => {
    dbInfo.pool.query('CALL usp_ReadFormats()', function (err, rows, fields) {
        if (err)
          reject('Something went wrong.');
        else
          resolve(rows[0])
      });
  })}

  exports.createBook = function() {
    return new Promise( (resolve, reject) => {
    dbInfo.pool.query('CALL usp_createBook()', function (err, rows, fields) {
        if (err)
          reject('Something went wrong.');
        else
          resolve(rows[0])
      });
  })}

  exports.createFormat = function(newFormat) {
    console.log(newFormat);
      dbInfo.pool.query('CALL usp_CreateFormat("'+newFormat.newFormatName+'")', function (err, rows, fields) {
        if (err) throw(err);
      });
  }

  
exports.createAuthor = function(newAuthor) {
    console.log(newAuthor);
      dbInfo.pool.query('CALL usp_CreateAuthor("'+newAuthor.newAuthorName+'", "'+newAuthor.newAuthorBio+'", "'+newAuthor.newAuthorImageUrl+'")', function (err, rows, fields) {
        if (err)
          throw(err);
      });
  }
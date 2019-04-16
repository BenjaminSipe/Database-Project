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

  exports.createBook = function(newBook) {
    return new Promise( (resolve, reject) => {
        dbInfo.pool.query('CALL usp_CreateBook("'+newBook.title+'", "'+newBook.publisher+'", "'+newBook.Isbn13+'", "'+newBook.date+'", "'+newBook.ImageUrl+'")', function (err, rows, fields) {
            if (err)
              reject('Something went wrong.');
            else
              resolve(rows[0]);
          });
      });
  }

  exports.createBookCategory = function(newBookCategory) {
    console.log("This is new book category: " + newBookCategory);
      dbInfo.pool.query('CALL usp_CreateBookCategory("'+newBookCategory.BookID+'", "'+newBookCategory.CategoryID+'")', function (err, rows, fields) {
        if (err) throw(err);
        else console.log(rows[0]);
      });
  }
  exports.createBookAuthor = function(newBookAuthor) {
   console.log("This is createAuthorBook newAB: " + newBookAuthor);
    dbInfo.pool.query('CALL usp_CreateAuthorBook("'+newBookAuthor.AuthorID+'", "'+newBookAuthor.BookID+'")', function (err, rows, fields) {
        if (err) throw(err);
        else console.log(rows[0]);
      });
  }

  exports.createBookFormat = function(newBookFormat) {
    dbInfo.pool.query('CALL usp_CreateBookFormat("'+newBookFormat.FormatID+'", "'+newBookFormat.BookID+'","'+newBookFormat.price+'", "'+newBookFormat.cost+'", "'+newBookFormat.quantity+'")', function (err, rows, fields) {
         if (err) throw(err);
         else console.log(rows[0]);
       });
   }
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
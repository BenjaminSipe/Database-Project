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
  exports.readBook = function(id) {
    return new Promise( (resolve, reject) => {
      //console.log(id);
    dbInfo.pool.query(`CALL usp_ReadBook( ${id} )`, function (err, rows, fields) {
        if (err) {
          console.log(err);
          reject('{"error":"No Book Found"}');}
        else
          resolve(rows[0])
      });
  })}
  exports.readBookFormats = function() {
    return new Promise( (resolve, reject) => {
    dbInfo.pool.query('CALL usp_ReadBookFormats()', function (err, rows, fields) {
        if (err)
          reject('Something went wrong.');
        else
          resolve(rows[0])
      });
  })}
  exports.readBookFormat = function(id) {
    return new Promise( (resolve, reject) => {
      //console.log(id);
    dbInfo.pool.query(`CALL usp_ReadBookFormat( ${id} )`, function (err, rows, fields) {
        if (err) {
          console.log(err);
          reject('{"error":"No BookFormat Found"}');}
        else
          resolve(rows[0])
      });
  })}
  exports.readBookAuthor = function(id) {
    return new Promise( (resolve, reject) => {
      //console.log(id);
    dbInfo.pool.query(`CALL usp_ReadBookAuthor( ${id} )`, function (err, rows, fields) {
        if (err) {
          console.log(err);
          reject('{"error":"No BookAuthor Found"}');}
        else
          resolve(rows[0])
      });
  })}

  exports.readBooksByCategory = function(category) {
    let v = "'" + category + "'";
    return new Promise( (resolve, reject) => {
    dbInfo.pool.query(`CALL usp_ReadBooksByCategory( ${v } )`, function (err, rows, fields) {
        if (err) {
          console.log("Error in books by category" + err);
          reject('{"error":"No Books in Category"}');}
        else
          resolve(rows[0])
      });
  })};

  exports.readBookCategory = function(id) {
    return new Promise( (resolve, reject) => {
      //console.log(id);
    dbInfo.pool.query(`CALL usp_ReadBookCategory( ${id} )`, function (err, rows, fields) {
        if (err) {
          console.log(err);
          reject('{"error":"No BookCategory Found"}');}
        else
          resolve(rows[0])
      });
  })}
  exports.readPublisher = function(index) {
    return new Promise( (resolve, reject) => {
    dbInfo.pool.query('CALL usp_ReadPublisher( ? )', index, function (err, rows, fields) {
        if (err)
          reject('Something went wrong.');
        else
          resolve(rows[0])
      });
  })}
  exports.readBookPublisher = function(index) {
    return new Promise( (resolve, reject) => {
    dbInfo.pool.query('CALL usp_ReadBookPublisher( ? )', index, function (err, rows, fields) {
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
  exports.readAuthor = function(index) {
    return new Promise( (resolve, reject) => {
    dbInfo.pool.query('CALL usp_ReadAuthor( ? )', index, function (err, rows, fields) {
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
  exports.readFormat = function(id) {
    return new Promise( (resolve, reject) => {
      //console.log(id);
    dbInfo.pool.query(`CALL usp_ReadFormat( ${id} )`, function (err, rows, fields) {
        if (err) {
          console.log(err);
          reject('{"error":"No Format Found"}');}
        else
          resolve(rows[0])
      });
  })}
  
  exports.createBook = function(newBook) {
    return new Promise( (resolve, reject) => {
        dbInfo.pool.query('CALL usp_CreateBook("'+newBook.title+'", "'+newBook.publisher+'", "'+newBook.Isbn13+'", "'+newBook.date+'", "'+newBook.imageUrl+'")', function (err, rows, fields) {
            if (err)
              reject('Something went wrong.');
            else
              resolve(rows[0]);
          });
      });
  }

  exports.deleteBook = function(book) {
    return new Promise( (resolve, reject) => {
        dbInfo.pool.query('CALL usp_DeleteBook("'+book.BookID+'", "'+newBook.publisher+'", "'+newBook.Isbn13+'", "'+newBook.date+'", "'+newBook.imageUrl+'")', function (err, rows, fields) {
            if (err)
              reject('Something went wrong.');
            else
              resolve(rows[0]);
          });
      });
  }
  exports.createBookCategory = function(newBookCategory) {
    //console.log("This is new book category: " + newBookCategory);
      dbInfo.pool.query('CALL usp_CreateBookCategory("'+newBookCategory.BookID+'", "'+newBookCategory.CategoryID+'")', function (err, rows, fields) {
        if (err) throw(err);
        else console.log(rows[0]);
      });
  }
  exports.createBookAuthor = function(newBookAuthor) {
   //console.log("This is createAuthorBook newAB: " + newBookAuthor);
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
    //console.log(newFormat);
      dbInfo.pool.query('CALL usp_CreateFormat("'+newFormat.newFormatName+'")', function (err, rows, fields) {
        if (err) throw(err);
      });
  }

  
exports.createAuthor = function(newAuthor) {
    //console.log(newAuthor);
      dbInfo.pool.query('CALL usp_CreateAuthor("'+newAuthor.newAuthorName+'", "'+newAuthor.newAuthorBio+'", "'+newAuthor.newAuthorImageLink+'")', function (err, rows, fields) {
        if (err)
          throw(err);
      });
  }

  exports.deleteBook = function(book) {
    //console.log(book);
      dbInfo.pool.query('CALL usp_DeleteBook("'+book.BookID+'")', function (err, rows, fields) {
        if (err) throw(err);
      });
  }
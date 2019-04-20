const dbInfo = require('./dbInfo');
exports.createCart = function(newCart) {
    return new Promise( (resolve, reject) => {
        dbInfo.pool.query('CALL usp_CreateShoppingCart("'+newCart.Datetime+'")', function (err, rows, fields) {
            if (err)
              reject('Something went wrong in Create Shopping Cart.');
            else
              resolve(rows[0]);
          });
      });
  }

  exports.readCart = function(id) {
    return new Promise( (resolve, reject) => {
      console.log(id);
    dbInfo.pool.query(`CALL usp_ReadShoppingCart( ${id} )`, function (err, rows, fields) {
        if (err) {
          console.log(err);
          reject('{"error":"No Carts Found"}');}
        else
          resolve(rows[0])
      });
  })}
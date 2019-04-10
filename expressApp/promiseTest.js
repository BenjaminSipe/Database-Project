const dbInfo = require('./dbInfo');
exports.queryTest = new Promise( (resolve, reject) => {
  dbInfo.pool.query('CALL usp_ReadBooks()', function (err, rows, fields) {
      if (err)
        reject('Something went wrong.');
      else
        resolve(rows[0])
    });
});

exports.promise1 = new Promise( (resolve, reject) => {
  let dataRecievedSuccessfully = true;

  if (dataRecievedSuccessfully)
    resolve('Data Available!');
  if (!dataRecievedSuccessfully)
    reject('Data Corrupted!');
})

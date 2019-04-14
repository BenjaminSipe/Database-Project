const dbInfo = require('./dbInfo');

exports.readPublishers = function() {
  return new Promise( (resolve, reject) => {
  dbInfo.pool.query('CALL usp_ReadPublishers()', function (err, rows, fields) {
    if (err)
    reject('Something went wrong.');
  else
    resolve(rows[0])
    });
})}
exports.createPublisher = function(newPublisher) {
    console.log(newPublisher);
      dbInfo.pool.query('CALL usp_CreatePublisher("'+newPublisher.newPublisherName+'", "'+newPublisher.newPublisherContactName+'", "'+newPublisher.newPublisherAddress+'", "'+newPublisher.newPublisherPhone+'")', function (err, rows, fields) {
        if (err)
          throw(err);
      });
  }
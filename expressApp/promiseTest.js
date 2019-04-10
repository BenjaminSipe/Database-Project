exports.promise1 = new Promise( (resolve, reject) => {
  let dataRecievedSuccessfully = true;

  if (dataRecievedSuccessfully)
    resolve('Data Available!');
  if (!dataRecievedSuccessfully)
    reject('Data Corrupted!');
})

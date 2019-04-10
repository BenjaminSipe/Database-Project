const promises = require('./promiseTest');

promises.promise1.then( (message) => {
  console.log(message);
}).catch( (message) => {
  console.log(message);
})


console.log('test')

const promises = require('./promiseTest');

promises.queryTest.then( (message) => {
  //console.log(message);
  //console.log('test1')
}).catch( (message) => {
  //console.log(message);
  //console.log('test2')
})

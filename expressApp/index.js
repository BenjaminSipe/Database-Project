const express = require('express')
var cors = require('cors');
var mysql = require('mysql')

const app = express()
const port = 3000

var connection = mysql.createConnection({
  host     : 'db.cberkstresser.name',
  user     : 'benandailendev',
  password : 'Development2',
  database : 'teambenandailen'
});


app.use(cors());

app.get('/getbooks', (req, res) => {

  connection.query('CALL usp_ReadBooks()', function (err, rows, fields) {
      if (err) throw err
      res.send(rows[0])
    });
});


// pool.getConnection(function(err, connection) {
//   if (err) throw err; // not connected!
//
//   // Use the connection
// //
//   connection.query('CALL usp_ReadBooks()', function (error, results, fields) {
//     // When done with the connection, release it.
//     connection.release();
//
//     // Handle error after the release.
//     if (error) throw error;
//
//     // Don't use the connection here, it has been returned to the pool.
//   });
// });
//
//
// // app.get('/', (req, res) => res.send('Hello World!'))
// // app.get('/test', (req, res) => {res.send('Hello World!')
// // console.log("test")
// // })
//
// app.get('/getbooks', (req, res) => {
//     connection.query('CALL usp_ReadBooks()', function (err, rows, fields) {
//       if (err) throw err
//       res.send(rows[0])
//     });
// });


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

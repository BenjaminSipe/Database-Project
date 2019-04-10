const express = require('express')
var cors = require('cors');
var mysql = require('mysql')
var fs = require('fs');
const test = require('./dbInfo')
const categoryTest = require('./CategoryCRUD');

const app = express()
const port = 3000

var connection = mysql.createConnection(test.connectionString);


app.use(cors());

app.get('/getbooks', (req, res) => {
  connection.query('CALL usp_ReadBooks()', function (err, rows, fields) {
      if (err) throw err
      res.send(rows[0])
    });
});

app.use(cors());
app.get('/', (req, res) => {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  }
)})
app.get('/databaseTest', (req, res) => {
  res.write(test.connectionString.host);
  res.end();
})
app.get('/test', (req, res) => {

  var categories = categoryTest.readCategories();
  console.log("app.get")
  console.log(categories);
  res.send('hello world')
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const express = require('express')
var cors = require('cors');
var mysql = require('mysql')
const test = require('./dbconnectiontest')

const app = express()
const port = 3000
var connection = mysql.createConnection({
    host     : 'db.cberkstresser.name',
    user     : 'benandailendev',
    password : 'Development2',
    database : 'teambenandailen'
});


app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/test', (req, res) => {res.send('Hello World!')
console.log("test")
})

app.get('/dbtest', (req, res) => {

    connection.query('CALL usp_ReadCategories()', function (err, rows, fields) {
      if (err) throw err
      res.send(rows[0])
    });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

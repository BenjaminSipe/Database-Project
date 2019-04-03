var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'db.cberkstresser.name',
  user     : 'benandailendev',
  password : 'Development2',
});

connection.connect()

connection.query('SELECT * FROM Publisher', function (err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0])
})

connection.end()
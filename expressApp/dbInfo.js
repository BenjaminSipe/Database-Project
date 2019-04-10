var mysql = require('mysql')

exports.connectionString = {
    host     : 'db.cberkstresser.name',
    user     : 'benandailendev',
    password : 'Development2',
    database : 'teambenandailen'
}

exports.pool = mysql.createPool(this.connectionString)

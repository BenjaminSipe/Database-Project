var mysql = require('mysql')

exports.connectionString = {
    host     : 'db.cberkstresser.name',
    user     : 'benandailenapp',
    password : 'Development1',
    database : 'teambenandailen'
}

exports.pool = mysql.createPool(this.connectionString)

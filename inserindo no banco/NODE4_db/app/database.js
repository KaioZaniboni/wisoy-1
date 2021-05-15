var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    port     : '3306',
    user     : 'insert-user',
    password : 'chapeleiro',
    database : 'sensor'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('Conectado ao BD sucesso!')
});



module.exports = connection;
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.post("/test", function(req, res) {
  res.end(JSON.stringify(req.body))
})

app.listen(3000, function() {
    console.log("listening on 3000");
})
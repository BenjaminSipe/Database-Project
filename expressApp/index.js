const express = require('express')
var cors = require('cors');
var mysql = require('mysql')
var fs = require('fs');
var bodyParser = require("body-parser");
const test = require('./dbInfo')
const promises = require('./promiseTest');
const categoryTest = require('./CategoryCRUD');
const authUser = require('./AuthenticateUser');
const publisher = require('./PublisherCRUD');
const userCRUD = require('./userCRUD');
const book = require('./BookCRUD');

const app = express()
const port = 3000

var connection = mysql.createConnection(test.connectionString);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  fs.readFile('index.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();
  }
)})
app.all('/connection', (req, res) => {
  res.write(test.connectionString.host + "\n" +  test.connectionString.user);
  res.end();
})
app.post('/createUser', (req, res) => {
  console.log("Test Express Side")
  
  obj = JSON.parse(JSON.stringify(req.body));
  userCRUD.createUser(obj).then((message) => { 
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })

})
app.get('/readUsers', (req, res) =>
{
  userCRUD.readUsers().then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
})
app.get('/dbInfoTest/:id', (req, res) => {
  console.log(req.params.id)
  promises.queryTest.then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
})

app.get('/authUser/:email/:password', (req, res) => {
  categoryTest.readCategory(req.params.email, req.params.password).then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
});

app.get('/readCategory/:id', (req, res) => {
  categoryTest.readCategory(req.params.id).then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
});

app.get('/readCategories', (req, res) => {
  categoryTest.readCategories().then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
});


app.get('/readPublishers', (req, res) => {
  publisher.readPublishers().then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
});


app.get('/readBooks', (req, res) => {
  book.readBooks().then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
});

app.post('/createBook', (req, res) =>{
  console.log(req.body);
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));

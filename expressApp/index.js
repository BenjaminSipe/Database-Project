const dbInfo = require('./dbInfo');
const express = require('express')
var cors = require('cors');
var mysql = require('mysql')
var fs = require('fs');
var bodyParser = require("body-parser");
const test = require('./dbInfo')
const promises = require('./promiseTest');
const categoryTest = require('./CategoryCRUD');
const put = require('./updateService');

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

app.put("/update/:object", (req, res) => {
  put.updateObject(req.body, req.params.object).then( (message) => {
    console.log(message);
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
}); 


app.post('/createUser', (req, res) => {
  console.log("Test Express Side")
  obj = JSON.parse(JSON.stringify(req.body));
  userCRUD.createUser(obj).then((message) => { 
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
});
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

app.post('/authUser', (req, res) => {
  userCRUD.authUser(req.body.email, req.body.password).then( (message) => {
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

app.get('/readAuthors', (req, res) => {
  book.readAuthors().then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
});

app.get('/readFormats', (req, res) => {
  book.readFormats().then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
});

app.post('/createBook', bodyParser.json(), (req, res) => {
  return new Promise( (resolve, reject) => {
     res.json(req.body);
    //console.log('Something is posting...');
    //console.log(req.body);
    //console.log(req.body.title);
    dbInfo.pool.query('CALL usp_CreateBook("'+req.body.title+'", "'+req.body.publisher+'", "'+req.body.Isbn13+'", "'+req.body.date+'", "'+req.body.ImageUrl+'")', function (err, rows, fields) {
        if (err)
          reject('Something went wrong.');
        else
         
          resolve(rows[0]);
      });

      // dbInfo.pool.query('CALL usp_CreateBookCategory("'+req.body.BookID+'", "'+req.body.CategoryID+'")', function (err, rows, fields) {
      //   if (err)
      //     reject('Something went wrong.');
      //   else
      //     resolve(rows[0])
      // });
  });
})

app.post('/createCategory', bodyParser.json(), (req, res) => {
  return new Promise( (resolve, reject) => {
    res.json(req.body);
    categoryTest.createCategory(req.body);
  });
});

app.post('/createPublisher', bodyParser.json(), (req, res) => {
  return new Promise( (resolve, reject) => {
    res.json(req.body);
    publisher.createPublisher(req.body);
  });
});

app.post('/createFormat', bodyParser.json(), (req, res) => {
  return new Promise( (resolve, reject) => {
    res.json(req.body);
    book.createFormat(req.body);
  });
});

app.post('/createAuthor', bodyParser.json(), (req, res) => {
  return new Promise( (resolve, reject) => {
    res.json(req.body);
    book.createAuthor(req.body);
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

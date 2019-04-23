const dbInfo = require('./dbInfo');
const express = require('express')
var cors = require('cors');
var mysql = require('mysql')
var fs = require('fs');
var bodyParser = require("body-parser");
const test = require('./dbInfo')
const promises = require('./promiseTest');
const category = require('./CategoryCRUD');
const put = require('./updateService');

const publisher = require('./PublisherCRUD');
const userCRUD = require('./userCRUD');
const book = require('./BookCRUD');
const cart = require('./CartCRUD');
const app = express();
const port = 3000;

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
  console.log("Updating object .." + req.params.object);
  console.log("Updating body.." + req.body);
  put.updateObject(req.body, req.params.object).then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
}); 

app.put("/updateUserLoginInfo", (req, res) => {
  userCRUD.updateUserLoginInfo(req.body).then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
}); 

app.post('/createUser', (req, res) => {
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
app.get('/readUser/:id', (req, res) =>
{
  userCRUD.readUser(req.params.id).then( (message) => {
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
    res.send('{"UserID":0}')
  })
})

app.post('/authUser', (req, res) => {
  userCRUD.authUser(req.body.email, req.body.password).then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send('[{"UserID":0}]')
  })
});

app.get('/readCategory/:id', (req, res) => {
  category.readCategory(req.params.id).then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
});
app.get('/readBookCategory/:id', (req, res) => {
  book.readBookCategory(req.params.id).then( (message) => {
    dbInfo.pool.query('CALL usp_ReadCategory( ? )', message[0].CategoryID, function (err, rows, fields) {
      if (err)
        throw err;
      else
        res.send(rows[0]);
    });
  }).catch( (message) => {
    res.send(message)
  })
});


app.get('/readCategories', (req, res) => {
  category.readCategories().then( (message) => {
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
app.get('/readPublisher/:id', (req, res) => {
  book.readPublisher(req.params.id).then( (message) => {
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
app.get('/readBook/:id', (req, res) =>
{
  book.readBook(req.params.id).then( (message) => {
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
app.get('/readAuthor/:id', (req, res) =>
{
  book.readAuthor(req.params.id).then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
});
app.get('/readBookAuthor/:id', (req, res) =>
{
  book.readBookAuthor(req.params.id).then( (message) => {
    //console.log(message[0].AuthorID);
    dbInfo.pool.query('CALL usp_ReadAuthor( ? )', message[0].AuthorID, function (err, rows, fields) {
      if (err)
        throw err;
      else
        res.send(rows[0]);
    });
    
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
app.get('/readFormat/:id', (req, res) =>
{
  book.readFormat(req.params.id).then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
});
app.get('/readBooksByCategory/:category', (req, res) => {
  book.readBooksByCategory(req.params.category).then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })  
})
app.get('/readBookFormats', (req, res) =>
{
  book.readBookFormats().then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
});

app.post('/createBook', bodyParser.json(), (req, res) => {
  newBook = JSON.parse(JSON.stringify(req.body));
  book.createBook(newBook).then((message) => { 
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})
app.post('/deleteBook', bodyParser.json(), (req, res) => {
  bookToDelete = JSON.parse(JSON.stringify(req.body));
  book.deleteBook(bookToDelete);
  res.json(req.body);
})

app.post('/createBookCategory', bodyParser.json(), (req, res) => {
  return new Promise( (resolve, reject) => {
    res.json(req.body);
    book.createBookCategory(req.body);
  });
});
app.post('/createAuthorBook', bodyParser.json(), (req, res) => {
  return new Promise( (resolve, reject) => {
    console.log("This is res.json from authorbook: "+res.json(req.body));
    book.createBookAuthor(req.body);
  });
});
app.post('/createBookFormat', bodyParser.json(), (req, res) => {
  return new Promise( (resolve, reject) => {
    res.json(req.body);
    book.createBookFormat(req.body);
  });
});
app.get('/readBookFormat/:id', (req, res) =>
{
  book.readBookFormat(req.params.id).then( (message) => {
    //console.log(message[0].AuthorID);
    book.readFormat(message[0].FormatID).then((message2) =>{
      message[0].FormatName = message2[0].FormatName;
      res.send(message);
    })
  }).catch( (message) => {
    res.send(message)
  })
});

app.get('/readBookPublisher/:id', (req, res) =>
{
  book.readBookPublisher(req.params.id).then( (message) => {
    //console.log(message[0].AuthorID);
    book.readPublisher(message[0].PublisherID).then((message2) =>{
      res.send(message2);
    })
  }).catch( (message) => {
    res.send(message)
  })
});
app.post('/createCategory', bodyParser.json(), (req, res) => {
  return new Promise( (resolve, reject) => {
    res.json(req.body);
    category.createCategory(req.body);
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

app.post('/createCart', bodyParser.json(), (req, res) => {
  return new Promise( (resolve, reject) => {
    //console.log(res.json(req.body));
    cart.createCart(req.body).then((message) => { 
      res.send(message);
    }).catch((message) => {
      res.send(message);
    });
  });
});
app.get('/readCart/:id', (req, res) =>
{
  cart.readCart(req.params.id).then( (message) => {
    res.send(message);
  }).catch( (message) => {
    res.send(message)
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const dbInfo = require('./dbInfo');
const express = require('express')
const nodemailer = require("nodemailer");
var mysql = require('mysql')
var fs = require('fs');
var bodyParser = require("body-parser");
const test = require('./dbInfo')
const promises = require('./promiseTest');
const category = require('./CategoryCRUD');
const put = require('./updateService');
const creditCard = require('./CreditCardCRUD');
const publisher = require('./PublisherCRUD');
const userCRUD = require('./userCRUD');
const book = require('./BookCRUD');
const cart = require('./CartCRUD');
const purchase = require("./Purchase");
const Admin = require("./AdminFunctions");
const app = express();
const port = 3000;

var connection = mysql.createConnection(test.connectionString);

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.all("/api/testBody", (req, res) => {
  res.send(req.body);
})
app.all("/api/testParams", (req, res) => {
  res.send(req.params);
})

app.get('/api/', (req, res) => {
  fs.readFile('index.html', function (err, data) {
    res.writeHead(200, {
      'Content-Type': 'text/html'
    });
    res.write(data);
    res.end();
  })
})
app.all('/api/connection', (req, res) => {
  res.write(test.connectionString.host + "\n" + test.connectionString.user);
  res.end();
})

app.put("/api/update/:object", (req, res) => {
  //console.log("Updating object .." + req.params.object);
  //console.log("Updating body.." + req.body);
  put.updateObject(req.body, req.params.object).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});

app.put("/api/updateUserLoginInfo", (req, res) => {
  userCRUD.updateUserLoginInfo(req.body).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});

app.post('/api/createUser', (req, res) => {
  obj = JSON.parse(JSON.stringify(req.body));
  userCRUD.createUser(obj).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
});
app.get('/api/readUsers', (req, res) => {
  userCRUD.readUsers().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
})
app.get('/api/readUser/:id', (req, res) => {
  userCRUD.readUser(req.params.id).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
})


app.get('/api/dbInfoTest/:id', (req, res) => {
  //console.log(req.params.id)
  promises.queryTest.then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send('{"UserID":0}')
  })
})

app.post('/api/authUser', (req, res) => {
  userCRUD.authUser(req.body.email, req.body.password).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send('[{"UserID":0}]')
  })
});

app.get('/api/readCategory/:id', (req, res) => {
  category.readCategory(req.params.id).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});
app.get('/api/readBookCategory/:id', (req, res) => {
  book.readBookCategory(req.params.id).then((message) => {
    dbInfo.pool.query('CALL usp_ReadCategory( ? )', message[0].CategoryID, function (err, rows, fields) {
      if (err)
        throw err;
      else
        res.send(rows[0]);
    });
  }).catch((message) => {
    res.send(message)
  })
});


app.get('/api/readCategories', (req, res) => {
  category.readCategories().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});


app.get('/api/readPublishers', (req, res) => {
  publisher.readPublishers().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});
app.get('/api/readPublisher/:id', (req, res) => {
  book.readPublisher(req.params.id).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});
app.get('/api/readBooks', (req, res) => {
  book.readBooks().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});
app.get('/api/readBook/:id', (req, res) => {
  book.readBook(req.params.id).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});
app.get('/api/readBooksInvoice', (req, res) => {
  book.readBooksInvoice().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});
app.get('/api/readBookInvoice/:id', (req, res) => {
  book.readBookInvoice(req.params.id).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});
app.get('/api/readAuthors', (req, res) => {
  book.readAuthors().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});
app.get('/api/readAuthor/:id', (req, res) => {
  book.readAuthor(req.params.id).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});
app.get('/api/readBookAuthor/:id', (req, res) => {
  book.readBookAuthor(req.params.id).then((message) => {
    ////console.log(message[0].AuthorID);
    dbInfo.pool.query('CALL usp_ReadAuthor( ? )', message[0].AuthorID, function (err, rows, fields) {
      if (err)
        throw err;
      else
        res.send(rows[0]);
    });

  }).catch((message) => {
    res.send(message)
  })
});

app.get('/api/readFormats', (req, res) => {
  book.readFormats().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});
app.get('/api/readFormat/:id', (req, res) => {
  book.readFormat(req.params.id).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});

app.get('/api/ReadCreditCardNumber/:id/:ccv', (req, res) => {
  creditCard.readCreditCardNumber(req.params).then((m) => {
    res.send(m);
  }).catch((message) => {
    res.send(message);
  })
})

app.get('/api/ReadCreditCard/:id', (req, res) => {
  creditCard.readCreditCardNumber(req.params.id).then((m) => {
    res.send(m);
  }).catch((message) => {
    res.send(message);
  })
})
app.get('/api/ReadCreditCardByUser/:id', (req, res) => {
  creditCard.readCreditCardByUser(req.params.id).then((m) => {
    res.send(m);
  }).catch((message) => {
    res.send(message);
  })
})

app.post('/api/CreateCreditCard', (req, res) => {
  creditCard.createCreditCard(req.body);
  res.send("Credit Card added");
})

app.delete('/api/DeleteCreditCard/:id', (req, res) => {
  creditCard.deleteCreditCard(req.params.id);
  res.send("CreditCard Deleted");
})
app.get('/api/readBooksByCategory/:category', (req, res) => {
  book.readBooksByCategory(req.params.category).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
})

app.get('/api/readAveragePrice', (req, res) => {
  Admin.ReadAveragePrice().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})
app.get('/api/ReadBooksBySales', (req, res) => {
  Admin.ReadBooksBySales().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})

app.get("/api/ReadRevenueByPublisherByDay", (req, res) => {
  Admin.ReadRevenueByPublisherByDay().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})

app.get("/api/ReadTopBooks", (req, res) => {
  Admin.ReadTopBooks().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})

app.get("/api/ReadTotalValue", (req, res) => {
  Admin.ReadTotalValue().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})

app.get("/api/ReadTotalValueByCategory", (req, res) => {
  Admin.ReadTotalValueByCategory().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})

app.get("/api/ReadTotalValueByPublisher", (req, res) => {
  Admin.ReadTotalValueByPublisher().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})

app.get("/api/ReadTotalRevenueByTime", (req, res) => {
  Admin.ReadTotalRevenueByTime(req.body).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})

app.get("/api/ReadOrders", (req, res) => {
  Admin.ReadOrders().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})

app.post("/api/CreateAdmin/:id", (req, res) => {
  userCRUD.CreateAdmin(req.params.id);
  res.send('{"Success":"Success"}');
});
app.delete("/api/deleteUser/:id", (req, res) => {
  userCRUD.deleteUser(req.params.id).then((message) => {
    res.send("UserDeleted");
  }).catch((message) => {
    res.send("Failed to Delete User.")
  });
})

app.get("/api/ReadOrdersByUser/:id", (req, res) => {
  Admin.ReadOrdersByUser(req.params.id).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})

app.get("/api/ReadOrderByInvoiceID/:id", (req, res) => {
  Admin.ReadOrderByInvoiceID(req.params.id).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})

app.get('/api/readBookFormats', (req, res) => {
  book.readBookFormats().then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
});

app.post('/api/createBook', bodyParser.json(), (req, res) => {
  newBook = JSON.parse(JSON.stringify(req.body));
  book.createBook(newBook).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message);
  })
})
app.post('/api/deleteBook', bodyParser.json(), (req, res) => {
  bookToDelete = JSON.parse(JSON.stringify(req.body));
  book.deleteBook(bookToDelete);
  res.json(req.body);
})

app.post('/api/createBookCategory', bodyParser.json(), (req, res) => {
  return new Promise((resolve, reject) => {
    res.json(req.body);
    book.createBookCategory(req.body);
  });
});
app.post('/api/createAuthorBook', bodyParser.json(), (req, res) => {
  return new Promise((resolve, reject) => {
    //console.log("This is res.json from authorbook: " + res.json(req.body));
    book.createBookAuthor(req.body);
  });
});
app.post('/api/createBookFormat', bodyParser.json(), (req, res) => {
  return new Promise((resolve, reject) => {
    res.json(req.body);
    book.createBookFormat(req.body);
  });
});
app.get('/api/readBookFormat/:id', (req, res) => {
  book.readBookFormat(req.params.id).then((message) => {
    ////console.log(message[0].AuthorID);
    book.readFormat(message[0].FormatID).then((message2) => {
      message[0].FormatName = message2[0].FormatName;
      res.send(message);
    }).catch((message_ => {
      res.send(message);
    }))
  }).catch((message) => {
    res.send(message)
  })
});

app.get('/api/readBookPublisher/:id', (req, res) => {
  book.readBookPublisher(req.params.id).then((message) => {
    ////console.log(message[0].AuthorID);
    book.readPublisher(message[0].PublisherID).then((message2) => {
      res.send(message2);
    }).catch((message) => {
      res.send(message);
    })
  }).catch((message) => {
    res.send(message)
  })
});
app.post('/api/createCategory', bodyParser.json(), (req, res) => {
  category.createCategory(req.body).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send('{"error":"Unable to create Category"}')
  });
});

app.post('/api/createPublisher', bodyParser.json(), (req, res) => {
  return new Promise((resolve, reject) => {
    res.json(req.body);
    publisher.createPublisher(req.body);
  });
});

app.post('/api/createFormat', bodyParser.json(), (req, res) => {
  return new Promise((resolve, reject) => {
    res.json(req.body);
    book.createFormat(req.body);
  });
});

app.post('/api/createAuthor', bodyParser.json(), (req, res) => {
  return new Promise((resolve, reject) => {
    res.json(req.body);
    book.createAuthor(req.body);
  });
});

app.post('/api/createCart', bodyParser.json(), (req, res) => {
  return new Promise((resolve, reject) => {
    ////console.log(res.json(req.body));
    cart.createCart(req.body).then((message) => {
      res.send(message);
    }).catch((message) => {
      res.send(message);
    });
  });
});
app.get('/api/readCart/:id', (req, res) => {
  cart.readCart(req.params.id).then((message) => {
    res.send(message);
  }).catch((message) => {
    res.send(message)
  })
})
//I need to create these Cards. I will assume the following structure:
/*
Body :
{
  "CreditCardID":ccID,
  "ShippingAddress":shippingAddress,
  "Discount":percentage,
  "Books": [
    {
      "BookID":bID,
      "FormatID":formatID,
      "Quantity":quantity
    }, . . .
  ]
}
*/
app.post('/api/CreatePurchase', (req, res) => {
  //console.log(req.body);
  //console.log("Create Purchase reached")
  purchase.CreateInvoice(req.body).then((message) => {
    req.body.InvoiceID = message;

    //This is where I add all of the books
    let list = [];
    let book;
      for (book of req.body.Books) {
        ////console.log(book);
          purchase.AddBook(book, message).then((message2) => {
            //console.log("no Issues")
            if (book == req.body.Books[req.body.Books.length - 1]) {
              if (list.length > 0) {
                res.send(list);
              } else {
                res.send('{"Result":"Order Placed"}')
              }
            }

          }).catch((message2) => {
            message2.quantity = book.productCount;
            list.push(message2);
            if (book == req.body.Books[req.body.Books.length - 1]) {
              if (list.length > 0) {
                res.send(list);
              } else {
                res.send('{"Result":"Order Placed"}')
              }
            }
          })
        }
  }).catch((message) => {
    //console.log(message);

    res.send("message");
  })
})
async function main(body) {

  //console.log(body);
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rread8205@gmail.com', // generated ethereal user
      pass: 'Adm1n12#4' // generated ethereal password
    }
  });
  var mailOptions = {
    from: 'rread8205@gmail.com', // sender address
    to: "sipe.nation3@gmail.com", // list of receivers
    subject: `Read:${body.name}`, // Subject line
    text: "comments for read", // plain text body
    html: `<b>from ${body.email},\n comment: ${body.comments}</b>` // html bod
  }
  // send mail with defined transport object
  await transporter.sendMail(mailOptions, function (error) {
    if (error) {
      //console.log(error);
    } else {

      //console.log('email sent.');
    }
  });
}

app.post("/api/sendMail", (req, res) => {
  //console.log("And Here");
  main(req.body);
  res.send('{"Test":"test"}');
})




app.listen(port, () => console.log(`Express API listening on port ${port}!`));
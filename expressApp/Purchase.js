const dbInfo = require('./dbInfo');
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
exports.CreateInvoice = function (body) {
    //console.log("Create Invoice")
    return new Promise((resolve, reject) => {
        let obj = [
            body.CardID,
            body.shippingAddress,
            body.discount
        ];
        dbInfo.pool.query('Call usp_CreateInvoice( ?, ?, ? )', obj, function (err, rows, fields) {
            if (err) {
                //console.log(err);
                reject("Something Went Wrong");
            } else
                resolve(rows[0][0].InvoiceID);
        })

    })
}
exports.AddBook = function (book, InvoiceID) {
    return new Promise((resolve, reject) => {
        dbInfo.pool.query("Call usp_CreateBookInvoice( ?, ? ,? ,? )", [
            book.BookID,
            book.FormatID,
            book.productCount,
            InvoiceID
        ], function (err, rows, fields) {
            if (err) {
                //console.log("______________________________________")
                //console.log(err);
                //console.log("This is the Error That is Printing ________")
                reject("Something Went Wrong");
            } else {
                if (rows[0][0].info == "Insufficient Quantity") {
                    //console.log("Not Enough Books");
                    reject(rows[0][0]);
                } else {
                    resolve(rows[0][0]);
                }
            }
        })
    })
}
const dbInfo = require('./dbInfo');

exports.readCreditCardNumber = function (body) {
    return new Promise((resolve, reject) => {
        let array = [body.CreditCardID, body.ccv];
        dbInfo.pool.query('CALL usp_ReadCreditCardNumber(? , ? )', array, function (err, rows, fields) {
            if (err)
                reject('Something went wrong.');
            else
                resolve(rows[0])
        });
    })
}

exports.readCreditCardByUser = function (index) {
    return new Promise((resolve, reject) => {
        dbInfo.pool.query(`CALL usp_ReadCreditCardByUser( ${index} )`, function (err, rows, fields) {
            if (err) {
                reject('Something went wrong.');
                
            } else
                resolve(rows[0])
        });
    })
}
exports.readCreditCard = function (index) {
    return new Promise((resolve, reject) => {
        dbInfo.pool.query('CALL usp_ReadCreditCard( ? )', index, function (err, rows, fields) {
            if (err)
                reject('Something went wrong.');
            else
                resolve(rows[0])
        });
    })
}
exports.createCreditCard = function (CreditCard) {
    creditCardp = CreditCard.CreditCardNumber + "";

    creditCardp = creditCardp.substr(creditCardp.length - 4);
    console.log(creditCardp + " " + CreditCard.CreditCardNumber);
    list = [CreditCard.UserID, CreditCard.BillingAddress,
    CreditCard.NameOnCard, CreditCard.ExpirationDate, creditCardp, CreditCard.CreditCardNumber, CreditCard.CCV]
    console.log(list);
    dbInfo.pool.query('CALL usp_CreateCreditCard( ?,?,?,?,?,?,? )', list, function (err, rows, fields) {
        //if (err) throw (err);
    });
}

exports.deleteCreditCard = function (id) {
    console.log(newCategory);
    dbInfo.pool.query('CALL usp_DeleteCreditCard("' + id + '")', function (err, rows, fields) {
        if (err) throw (err);
    });
}
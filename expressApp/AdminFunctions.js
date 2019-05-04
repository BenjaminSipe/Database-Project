const dbInfo = require('./dbInfo');

exports.ReadAveragePrice = function () {
    return new Promise((resolve, reject) => {
        dbInfo.pool.query('Call usp_ReadAveragePrice()', function (err, rows, fields) {
            if (err) {
                reject("Something Went Wrong");
                throw err;
            } else {
                resolve(rows[0]);
            }
        })
    })
}

exports.ReadOrders = function () {
    return new Promise((resolve, reject) => {
        dbInfo.pool.query('Call usp_ReadOrders()', function (err, rows, fields) {
            if (err) {
                reject("Something Went Wrong");
                throw err;
            } else {
                resolve(rows[0]);
            }
        })
    })
}

exports.ReadOrdersByUser = function (body) {
    return new Promise((resolve, reject) => {
        dbInfo.pool.query(`Call usp_ReadOrdersByUser(${body.UserID})`, function (err, rows, fields) {
            if (err) {
                reject("Something Went Wrong");
                throw err;
            } else {
                resolve(rows[0]);
            }
        })
    })
}

exports.ReadBooksBySales = function() {
    return new Promise((resolve, reject) => {
        dbInfo.pool.query('Call usp_ReadBooksBySales()', function(err, rows) {
            if (err) {
                reject("Here is the reject");
                throw err;
            } else 
                resolve(rows[0]);
        }) 
    })
}

exports.ReadRevenueByPublisherByDay = function() {
    return new Promise((resolve, reject) => {
        dbInfo.pool.query('Call usp_ReadRevenueByPublisherByDay()', function(err, rows) {
            if (err) {
                reject("Something Went Wrong")
                throw err;
            } else {
                resolve(rows[0]);
            }
        })
    })
}

exports.ReadTopBooks = function() {
    return new Promise((resolve, reject) => {
        dbInfo.pool.query('Call usp_ReadTopBooks()', function(err, rows) {
            if (err) {
                reject("Something Went Wrong")
                throw err;
            } else {
                resolve(rows[0]);
            }
        })
    })
}

exports.ReadTotalValue = function() {
    return new Promise((resolve, reject) => {
        dbInfo.pool.query('Call usp_ReadTotalValue()', function(err, rows) {
            if (err) {
                reject("Something Went Wrong")
                throw err;
            } else {
                resolve(rows[0]);
            }
        })
    })
}

exports.ReadTotalValueByCategory = function() {
    return new Promise((resolve, reject) => {
        dbInfo.pool.query('Call usp_ReadTotalValueByCategory()', function(err, rows) {
            if (err) {
                reject("Something Went Wrong")
                throw err;
            } else {
                resolve(rows[0]);
            }
        })
    })
}

exports.ReadTotalRevenueByTime = function(body) {
    return new Promise((resolve, reject) => {
        dbInfo.pool.query('Call usp_TotalRevenueByTime(? ,? )',[body.StartDate, body.EndDate], function(err, rows) {
            if (err) {
                reject("Something Went Wrong")
                throw err;
            } else {
                resolve(rows[0]);
            }
        })
    })
}
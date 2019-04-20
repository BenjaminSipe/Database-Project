const dbInfo = require('./dbInfo');


var objectParam = {
    "User":["name"
            ,"homePhone"
            ,"workPhone"
            ,"email"]
}

exports.updateObject = function(body, object) {
    return new Promise( (resolve, reject) => {
        x = "";
        args = [];
        for (let y of objectParam[object]) {
            args.push(body[y]);
            if (x === "") {
                x = " ? "
            } else {
                x = x + " , ? "
            }
        }
        dbInfo.pool.query(`CALL usp_Update${object}(${x})`, args , function (err, rows, fields) {
        if (err) {
          reject(`{"error":"Unable To Update ${object}"}`);
        } else {
            resolve(`{"result":"${object} Updated"}`);
        }
    }
    );
})}
const connection = require("./connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
/* function printQuestionMarks(num) {
    var arr = [];
    // 
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}; */

function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        // Get the value for the current key
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
            // e.g. {sleepy: true} => ["sleepy=true"]
            arr.push(key + "=" + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
};

const orm = {
    selectAll: (tableInput, cb) => {
        // Query: SELECT * FROM burgers;
        const queryString = "SELECT * FROM " + tableInput;
        console.log("Get query string:", queryString)
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err
            };
            // Send result in a callback
            cb(result);
        });
    },
    insertOne: (table, col, val, cb) => {
        // Query: INSERT INTO burgers (burger_name) VALUES ([burger name goes here])
        const queryString = "INSERT INTO " + table + " (" + col + ") VALUES ('" + val + "');";

        console.log("value:", val);
        console.log("The query string for creating this burger:", queryString);

        connection.query(queryString, (err, result) => {
            if (err) {
                throw err
            };
            // Send result in a callback
            cb(result);
        });
    },
    updateOne: (table, objColVals, condition, cb) => {
        // 
        const queryString = "UPDATE " + table +
            " SET " + objToSql(objColVals) +
            " WHERE " + condition + ";";

        console.log("The query string for updating this burger:", queryString);

        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            // Send result in a callback
            cb(result);
        });
    }
};


module.exports = orm;
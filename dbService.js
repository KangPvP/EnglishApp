const mysql = require('mysql');
const dotenv = require('dotenv')
dotenv.config();

const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306

})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!")

    var date = new Date().getTime();
    console.log(date)

    var sql = `INSERT INTO table_word (id, worden, date, level) VALUES (1, 'word', ${date}, 2)`

    /*connection.query(sql, function (err, result) {
        if(err) throw err;
        console.log("1 record inserted")
    })*/
})


async function getAllData() {
    try {
        const results = await new Promise((resolve, reject) => {
            const sql = "SELECT * FROM table_word";

            connection.query(sql, (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });

        // Return the results
        return results;
    } catch (error) {
        // Log the error
        console.log(error);
        // Throw the error again if needed
        throw error;
    }
}

async function insertNewWord(data) {
    try {
        var sqlMaxId = `SELECT max(id) FROM table_word`
        connection.query(sqlMaxId, function (err, result) {
            if(err) throw err;
            var maxId = result
        })
        
        let id = maxId + 1;
        let word = data.word
        


        var sql = `INSERT INTO table_word (id, worden, date, level) VALUES (${maxId}+1, 'word', ${date}, 2)`
        connection.query(sql, function (err, result) {
            if(err) throw err;
            console.log("1 record inserted")
        })
    } catch (error) {
        
    }
}


module.exports.getdata = getAllData



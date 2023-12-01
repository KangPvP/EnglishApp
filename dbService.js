const mysql = require('mysql');
const dotenv = require('dotenv');
const { response } = require('express');
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


async function getMaxId(){

    const request = new Promise((resolve, reject) => {
        let sqlMaxId = `SELECT max(id) FROM table_word`
        connection.query(sqlMaxId, function (err, result) {
            if(err) reject(err);
            resolve(result[0]['max(id)'])
        })
    })

    return request
}

async function insertNewWord(data) {
    try {

        let maxId = await getMaxId()

        const insertWord = await new Promise((resolve, reject) => {

            let id = maxId + 1;
            let date = Date.now()
            let worden = data.Form__add__worden
            let wordfr = data.Form__add__wordfr
            let level = data.Form__add__level

            let sql = `INSERT INTO table_word (id, worden, wordfr, date, level) VALUES (?, ?, ?, ?, ?)`;
            let values = [id, worden, wordfr, date, level];
            console.log(values)

            connection.query(sql, values, function (err, result) {
                if(err) throw err;
                resolve(result.insertWord);
            })
        })
        console.log(insertWord)
        return response;
    } catch (error) {
        console.log(error)
    }
    
}




module.exports = {
    getdata: getAllData,
    insertword: insertNewWord
} 



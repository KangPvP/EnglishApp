/* This code is establishing a connection to a MySQL database using the `mysql` module in Node.js. */
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
    console.log("Connected to mysql DB !")
})


/**
 * The function `getAllData` retrieves all data from a table named `table_word` using a SQL query and
 * returns the results.
 * @returns the results of the SQL query, which is an array of objects representing the rows returned
 * from the "table_word" table.
 */
async function getAllData() {
    try {
        const results = await new Promise((resolve, reject) => {
            const sql = "SELECT * FROM table_word";

            connection.query(sql, (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            });
        });

        return results;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


/**
 * The function `getMaxId` retrieves the maximum value of the `id` column from a table called
 * `table_word` using a SQL query.
 * @returns The function `getMaxId` returns a promise that resolves to the maximum value of the `id`
 * column from the `table_word` table in a database.
 */
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

/**
 * The function `insertNewWord` inserts a new word into a database table and returns the inserted data.
 * @param data - The `data` parameter is an object that contains the values for inserting a new word
 * into the database. It has the following properties:
 * @returns an object called `dataReturn` which contains the following properties: `id`, `worden`,
 * `wordfr`, `date`, and `level`.
 */
async function insertNewWord(data) {
    try {
        let maxId = await getMaxId();
        let id = maxId + 1;
        let date = new Date().toISOString();
        let worden = data.Form__add__worden;
        let wordfr = data.Form__add__wordfr;
        let level = data.Form__add__level;

        let dataReturn = {id: id, worden: worden, wordfr: wordfr, date: date, level: level}

        let sql = `INSERT INTO table_word (id, worden, wordfr, date, level) VALUES (?, ?, ?, ?, ?)`;
        let values = [id, worden, wordfr, date, level];

        // Utilisez la fonction query avec une promesse
        const result = await new Promise((resolve, reject) => {
            connection.query(sql, values, function (err, result) {
                if (err) reject(err);
                resolve(result);
            });
        });

        console.log(dataReturn);
        return dataReturn;
    } catch (error) {
        console.log(error);
        throw error;
    }
    
}

module.exports = {
    getdata: getAllData,
    insertword: insertNewWord
} 



/* This code is setting up a basic Express server. */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

var dbService = require('./dbService');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/website', express.static(path.join(__dirname + '/public')))

app.listen(3000, () => {
    console.log("App listening on port 3000")
})

/* The code `app.post('/inserts', async (request, response) => { ... })` is setting up a route for
handling HTTP POST requests to the '/inserts' endpoint. */
app.post('/inserts', async (request, response) => {
    let formData = request.body;
    
    try {
        // the function insertNewWord is use for insert a word in the DB
        const insertedData = await dbService.insertword(formData);

        // insertedData contain a json with the data about the word added
        response.json({ success: true, data: insertedData });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
})


/* The code `app.get('/getAll', async (request, response) => { ... })` is setting up a route for
handling HTTP GET requests to the '/getAll' endpoint. */
app.get('/getAll', async (request, response) => {
    try {
        const data = await dbService.getdata();

        response.json({ data: data });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

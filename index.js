const express = require('express');
const path = require('path');
const app = express();
const dotenv = require("dotenv");
dotenv.config();

var dbService = require('./dbService');


app.use('/website', express.static(path.join(__dirname + '/public')))


app.listen(3000, () => {
    console.log("App listening on port 3000")
})

// create
app.post('/insert', (request, response) => {
    const fromData = request.body;
    
})

// read
app.get('/getAll', async (request, response) => {
    try {
        const data = await dbService.getdata();
        console.log("test")
        console.log(data)
        response.json({ data: data });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

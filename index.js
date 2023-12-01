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

// create
app.post('/inserts', async (request, response) => {
    let formData = request.body;
    
    console.log("testss")
    console.log(request.body)
    console.log("tes")
    
    try {
        await dbService.insertword(formData);

        response.json({ sucess: true });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
})

// read
app.get('/getAll', async (request, response) => {
    try {
        const data = await dbService.getdata();

        response.json({ data: data });
    } catch (error) {
        console.log(error);
        response.status(500).json({ error: 'Internal Server Error' });
    }
});

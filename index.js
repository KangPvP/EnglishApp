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
    
    try {
        // Utiliser la fonction insertNewWord pour insérer les données
        const insertedData = await dbService.insertword(formData);

        console.log(insertedData);
        console.log("test Success");

        // Utiliser response.json pour envoyer la réponse au client
        response.json({ success: true, data: insertedData });
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

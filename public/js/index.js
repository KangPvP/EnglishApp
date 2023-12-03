/* 
The code adding an event listener. This event is fired when page HTML finish to loading
*/
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => { loadHTMLTable(data['data']) });

    loadHTMLTable([])
})


/* This code is adding an event listener to the form with the id "Form__add". When the form is submitted */
let Formadd = document.getElementById('Form__add');
Formadd.addEventListener("submit", (e) => {
    e.preventDefault();

    // Convert a FormData Object into a Json Object
    let formData = new FormData(Formadd);
    let worden = formData.get('Form__add__worden');
    let wordfr = formData.get('Form__add__wordfr');
    let level = formData.get('Form__add__level');
    let jsonData = JSON.stringify({ "Form__add__worden": worden, "Form__add__wordfr": wordfr, "Form__add__level": level });

    // Resquest to add a new word into the Database and then it display the row
    fetch('http://localhost:3000/inserts', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: jsonData
    })
    .then(response =>response.json())
    .then(data => insertRowIntoTable(data['data']))
    .catch(error => console.error('Erreur lors de la requête :', error));

});



/**
 * The function `insertRowIntoTable` inserts a new row into an HTML table with the provided data.
 * @param data - The `data` parameter is an object that contains information about a row to be inserted
 * into a table. It has the following properties:
 */
function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody')
    const isTableEmpty = table.querySelector('.no-data')

    let tableHtml = `<tr class='Table__row${data.id}'>
        <td class='Table__cell'>${data.id}</td>
        <td class='Table__cell'>${data.worden}</td>
        <td class='Table__cell'>${data.wordfr}</td>
        <td class='Table__cell'>${new Date(data.date).getDate()}/${new Date(data.date).getMonth()+1}/${new Date(data.date).getUTCFullYear()}</td>
        <td class='Table__cell'>User1</td>
        <td class='Table__cell'>${data.level}</td>
    </tr>`
    console.log(tableHtml)
    

    if(isTableEmpty){ //test if .no-data existe
        table.innerHTML = tableHtml;
    } else {
        let newRow = table.insertRow()
        newRow.innerHTML = tableHtml;
    }
}


/**
 * The function `loadHTMLTable` takes in an array of data and dynamically populates an HTML table with
 * the data.
 * @param data - The `data` parameter is an array of objects. Each object represents a row of data for
 * the HTML table.
 */
function loadHTMLTable(data){
    const table = document.querySelector('table tbody');

    if (data.length == 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='6'>No Data</td></tr>"
    } else {
        table.innerHTML = ""
        for(i=0; i < data.length; i++){

            let id = data[i].id;
            let worden = data[i].worden;
            let wordfr = data[i].wordfr;
            let date = data[i].date;
            let level = data[i].level;
            
            table.innerHTML += `<tr>
                <td class='Table__cell'>${id}</td>
                <td class='Table__cell'>${worden}</td>
                <td class='Table__cell'>${wordfr}</td>
                <td class='Table__cell'>${new Date(date).getDate()}/${new Date(date).getMonth()+1}/${new Date(date).getUTCFullYear()}</td>
                <td class='Table__cell'>User1</td>
                <td class='Table__cell'>${level}</td>
            </tr>`
        }
    }
}
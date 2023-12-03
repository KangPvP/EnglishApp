document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        loadHTMLTable(data['data'])});

    loadHTMLTable([])
})

let Formadd = document.getElementById('Form__add');
Formadd.addEventListener("submit", (e) => {
    e.preventDefault();

    let formData = new FormData(Formadd);

    // Accédez aux valeurs du formulaire à l'aide de formData.get
    let worden = formData.get('Form__add__worden');
    let wordfr = formData.get('Form__add__wordfr');
    let level = formData.get('Form__add__level');

    let jsonData = JSON.stringify({ "Form__add__worden": worden, "Form__add__wordfr": wordfr, "Form__add__level": level });
    console.log(jsonData); 
    console.log("truc");

    fetch('http://localhost:3000/inserts', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: jsonData
    })
    .then(response => {
        console.log("Magnifique")
        return response.json()
    })
    .then(data => {
        console.log(data['data']);
        insertRowIntoTable(data['data']);
    })
    .catch(error => console.error('Erreur lors de la requête :', error));

    
});

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody')
    const isTableEmpty = table.querySelector('.no-data')
    console.log(data)
    let tableHtml = `<tr>
        <td class='Table__cell'>${data.id}</td>
        <td class='Table__cell'>${data.worden}</td>
        <td class='Table__cell'>${data.wordfr}</td>
        <td class='Table__cell'>${new Date(data.date).getDate()}/${new Date(data.date).getMonth()+1}/${new Date(data.date).getUTCFullYear()}</td>
        <td class='Table__cell'>User1</td>
        <td class='Table__cell'>${data.level}</td>
    </tr>`
    console.log(tableHtml)
    

    if(isTableEmpty){
        table.innerHTML = tableHtml;
    } else {
        let newRow = table.insertRow()
        newRow.innerHTML = tableHtml;
    }
}


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
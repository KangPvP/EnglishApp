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
    .then(response => response.json())
    .then(data => insertRowIntoTable(data['data']))
    .catch(error => console.error('Erreur lors de la requête :', error));
});

function insertRowIntoTable(data) {

}



function loadHTMLTable(data){
    const table = document.querySelector('table tbody');

    if (data.length == 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='4'>No Data</td></tr>"
    } else {
        table.innerHTML = ""
        for(i=0; i < data.length; i++){

            let id = data[i].id;
            let worden = data[i].worden
            let date = data[i].date
            let level = data[i].level
            

            table.innerHTML += `<tr>
                <td class='Table__cell'>${id}</td>
                <td class='Table__cell'>${worden}</td>
                <td class='Table__cell'>mot</td>
                <td class='Table__cell'>${date}</td>
                <td class='Table__cell'>User1</td>
                <td class='Table__cell'>${level}</td>
            </tr>`
        }
    }
}
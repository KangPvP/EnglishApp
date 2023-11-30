document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        loadHTMLTable(data['data'])});

    loadHTMLTable([])
})


let myUsername = document.getElementsByName('From__add__input');
console.log(myUsername[0]);

let Fromadd = document.getElementById('From__add');
Fromadd.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("esd")
    let valuess = new FormData(Fromadd)

    for (const pair of valuess.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }

    let response = fetch('http://localhost:3000/getAll', {
        method: 'POST',
        body: new FormData(Fromadd)
    })

    let result = response.json();
    alert(result.message);

})



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
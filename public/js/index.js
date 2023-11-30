document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/getAll')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        
        loadHTMLTable(data['data'])});

    loadHTMLTable([])
})

const From__add = document.getElementById('From__add');
From__add.onsubmit = async (event) => {
    event.preventDefault();

    let response = await fetch('http://localhost:3000/getAll', {
        method: 'POST',
        body: new FormData(From__add)
    })

    let result = await response.json();
    alert(result.message);

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
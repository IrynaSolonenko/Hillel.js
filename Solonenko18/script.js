'use strict';
!(function (){
let xhr = new XMLHttpRequest();
let planets;
let planetsArr = [];
let planetsTable = document.querySelector('#planetsTable');

function sendRequest() {
    xhr.open('GET', 'https://swapi.dev/api/planets/');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function (event) {
        if (xhr.status === 200) {
            try {
                planets = JSON.parse(xhr.response);
                planets.results.forEach(planet=>{
                    planetsArr.push(planet)
                    App();
                });

            } catch (error){
                console.log(error);
            }
        }
        if (xhr.status === 404){
            console.log('404');
        }
    }
    xhr.onerror = function (event) {
        console.log(event)
    }
    xhr.send()
}

function App() {
    let best;
    planetsArr.forEach(item=>{
        best = document.createElement('tr');
        planetsTable.innerHTML += `<td style="padding: 10px">${item.name}</td>
                            <td style="padding: 10px">${item.climate}</td>
                            <td style="padding: 10px">${item.created}</td>
                            <td style="padding: 10px">${item.films}</td>
                            <td style="padding: 10px">${item.gravity}</td>
                            <td style="padding: 10px">${item.diameter}</td>
                            <td style="padding: 10px">${item.orbital_period}</td>
                            <td style="padding: 10px">${item.population}</td>
                            <td style="padding: 10px">${item.residents}</td>
                            <td style="padding: 10px">${item.rotation_period}</td>
                            <td style="padding: 10px">${item.surface_water}</td>
                            <td style="padding: 10px">${item.terrain}</td>
                            <td style="padding: 10px">${item.url}</td>`;
        planetsTable.append(best);

    })
}

sendRequest();
}());
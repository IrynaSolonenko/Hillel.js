!(function (){
    let resultArr = [];
    let residentsArr = [];
    let newResultArr= [];
    let newResidentsArr= [];
    let planetsTable = document.querySelector('#planetsTable');
    let requestURL = 'https://swapi.dev/api/planets/';

    function sendRequest(url) {
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            resultArr = data.results;
            newResultArr = resultArr.slice();
            console.log(newResultArr);
            sendResidentsRequest();
            App();
        })
    }

    function sendResidentsRequest(){
        for (let i=0; i < newResultArr.length; i++) {
            newResultArr.forEach(resident => {
                return fetch(resident.residents[i]).then(response => {
                    return response.json();
                }).then(data => {
                    console.log(data.name);
                })
            })
        }
    }
    sendRequest(requestURL);
    function App() {
        let best;
        newResultArr.forEach(item=>{
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

}());

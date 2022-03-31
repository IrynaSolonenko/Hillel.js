!(function (){
    let resultArr = [];
    let newResultArr = [];
    let planetsTable = document.querySelector('#planetsTable');
    let requestURL = 'https://swapi.dev/api/planets/';

    function useFetching (url) {
        return fetch(url).then(response => response.json());
    }

    function sendRequest(url) {
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            resultArr = data.results;
            newResultArr = resultArr.slice();
            createPlanetsName();
        })
    }

    function createPlanetsName(){
        newResultArr.forEach(planet => {
            let planetTr = document.createElement('tr');
            let planetNameTd = document.createElement('th');
            planetNameTd.textContent = planet.name;
            planetTr.append(planetNameTd);
            planetsTable.append(planetTr);
            let residentsArr = planet.residents;

            residentsArr.forEach(resident => useFetching(resident).then(response => {
                let residentTd = document.createElement('td');
                residentTd.textContent = response.name;
                planetTr.append(residentTd);
            }))
        })
    }

    sendRequest(requestURL);
    
}());

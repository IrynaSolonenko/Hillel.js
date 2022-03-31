!(function (){
    let resultArr = [];
    let newResultArr= [];
    let residentsResultArr= [];
    let planetsTable = document.querySelector('#planetsTable');
    let planetName = document.querySelector('#planet-name');
    let residentName = document.querySelector('.resident-name');
    let requestURL = 'https://swapi.dev/api/planets/';

    function sendRequest(url) {
        fetch(url).then(response => {
            return response.json();
        }).then(data => {
            resultArr = data.results;
            newResultArr = resultArr.slice();

            sendResidentsRequest();
            createPlanetsName();
        })
    }

    function createPlanetsName(){
        newResultArr.forEach(name=>{
            let tr = document.createElement('tr');
            tr.textContent += JSON.stringify(name.name);
            planetName.append(tr)
        })
    }

    function sendResidentsRequest() {
        for (let i = 0; i < newResultArr.length; i++) {
            newResultArr.forEach(resident => {
                return fetch(resident.residents[i]).then(response => {
                    return response.json();
                }).then(data => {
                    // residentsResultArr = data.name;
                    // console.log(residentsResultArr);
                    // console.log(data);
                let residentTr = document.createElement('tr');
                    residentTr.textContent += data.name;
                console.log(data.name);
                    residentName.append(residentTr)
            })
            })
        }
    }
    sendRequest(requestURL);

}());

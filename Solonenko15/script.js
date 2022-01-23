const icon = document.querySelector('#icon');
const mandarinsAmountElement = document.querySelector('#mandarinsAmount');
const startButton = document.querySelector('#startButton');
let mandarin = document.querySelector('.mandarin');
let grinch = document.querySelector('.grinch');
const gameTime = document.querySelector('#gameTime');
let amountTime;
let sumMandarin;
let lastScoreInfo;
let lastScoreInfoArr = [];
let mandarinLastScore = document.querySelector('.mandarinLastScore');
let restartButton = document.querySelector('#restartButton');
let restartBestResult = document.querySelector('#restartBestResult');


let mandarinsAmount = 0;
let gameDuration = 5;
let gameInterval;
let mandarinInterval;
let grinchIntervalDelay;
let bestScore;
let bestScoreInfoArr;


icon.addEventListener('click', event=>{
    mandarinsAmount++;
    mandarinsAmountElement.textContent = `You caught ${mandarinsAmount} mandarins`;
    setMandarinPosition();
    sumMandarin = mandarinsAmount;
    clearInterval(mandarinInterval);
    mandarinInterval = setInterval(setMandarinPosition, 1000);

});

grinch.addEventListener('click', ()=>{
    gameDuration = 15;
    gameTime.textContent = `Game over!`
    icon.style.display = 'none';
    clearInterval(mandarinInterval);
    clearInterval(gameInterval)
    mandarinsAmount--;
    mandarinsAmountElement.textContent = `You caught ${mandarinsAmount} mandarins`;

})
function resetGame(){
    gameDuration = 15;
    mandarinsAmount = 0;
    mandarinsAmountElement.textContent = `You caught ${mandarinsAmount} mandarins`;
    gameTime.textContent = `${gameDuration} seconds left`;
}

function setMandarinPosition(){
    icon.style.left = Math.round(Math.random() * 270) + 'px';
    icon.style.top = Math.round(Math.random() * 270) + 'px';

    if(gameDuration === grinchIntervalDelay){
        mandarin.style.display = 'none';
        grinch.style.display = 'block';
        grinchIntervalDelay = Math.round(Math.random() * gameDuration);

    }else {
        mandarin.style.display = 'block';
        grinch.style.display = 'none';
    }

}

function startGame() {
    if (gameDuration === 1) {
        icon.style.display = 'none';
        gameTime.textContent = `Game over!`
        clearInterval(gameInterval);
        clearInterval(mandarinInterval);
        return;
    }

    gameDuration -= 1;
    gameTime.textContent = `${gameDuration} seconds left`;
    amountTime = `${15 - gameDuration}`;
}

startButton.addEventListener('click', event =>{
    setMandarinPosition()
    icon.style.display = 'block';
    resetGame();
    sumMandarin = 0;
    startButton.disabled = true;
    grinchIntervalDelay = Math.round(Math.random() * gameDuration);
    mandarinInterval = setInterval(setMandarinPosition, 1000);
    gameInterval = setInterval(startGame, 1000);
});

//Блокируем кнопку старта вовремя игры и добавляем возможность остановить игру в любой момент
restartButton.addEventListener('click', event => {
    startButton.disabled = false;
    resetGame();
    gameTime.textContent = `Game over!`
    icon.style.display = 'none';
    clearInterval(gameInterval);
    clearInterval(mandarinInterval);
    addlastScoreInfo();
});

function addlastScoreInfo() {
    //Создаем табличку с последними данными
    lastScoreInfo = {
        time: amountTime,
        amount: sumMandarin
    }
    lastScoreInfoArr.push(lastScoreInfo);

    if (lastScoreInfoArr.length > 1) {
        lastScoreInfoArr.splice(2, lastScoreInfoArr.length - 1);
    }


    //добавляем последние результаты в Last Score
    for (let key in lastScoreInfoArr) {
        let info = document.createElement('tr');
        if (typeof sumMandarin === 'undefined') {
            sumMandarin = 0;
        }
        if (typeof amountTime === 'undefined') {
            amountTime = 0;
        }
        info.innerHTML += `<td style="padding: 8px;">${amountTime}</td><td style="padding: 8px;">${sumMandarin}</td>`;
        mandarinLastScore.innerHTML = '';
        mandarinLastScore.append(info);
    }
}

restartBestResult.addEventListener('click', bestScoreArr)
function bestScoreArr(){
    //добавляем результаты в Best Score
    lastScoreInfoArr.forEach(amounts => {
        lastScoreInfoArr.sort(amounts = (a, b) => a.amount < b.amount ? 1 : -1);
    })
    bestScoreInfoArr = lastScoreInfoArr.slice()
    for (let key in bestScoreInfoArr) {
        let best = document.createElement('tr');
        best.innerHTML += `<td style="padding: 8px;">${key.time}</td><td style="padding: 8px;">${key.amount}</td>`;
        mandarinBestScore.innerHTML = '';
        mandarinBestScore.append(best);
    }

    console.log(bestScoreInfoArr)
}

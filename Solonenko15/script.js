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
let mandarinBestScore = document.querySelector('.mandarin-best-score')

let restartButton = document.querySelector('#restartButton')


let mandarinsAmount = 0;
let gameDuration = 5;
let gameInterval;
let mandarinInterval;
let grinchIntervalDelay;



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
    startButton.disabled = true;
    restartButton.disabled = false;
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

    //Создаем табличку с последними данными
    lastScoreInfo = {
        time: amountTime,
        amount: sumMandarin
    }
// if (sumMandarin !== sumMandarin) {sumMandarin = '';}
    lastScoreInfoArr.push(lastScoreInfo)
    // lastScoreInfoArr.splice(3, [lastScoreInfo.length]);
    console.log(lastScoreInfo)

    for (let key in lastScoreInfo){
        let row = document.createElement('tr');
        row.innerHTML = `<td>${amountTime}</td><td>${sumMandarin}</td>`
        document.querySelector('.resultTable').appendChild(row)
    }
});






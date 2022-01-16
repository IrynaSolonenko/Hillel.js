let button = document.querySelector('.button');
let modalClose = document.querySelector('.button-close');
let background = document.querySelector('.background')

button.addEventListener("click", function (){
    background.style.display = "inline-block";
})
modalClose.addEventListener("click", function (){
    background.style.display = "none";
})

document.addEventListener("click", function (event){
    if(event.target === background){
        background.style.display = "none";
    }
})


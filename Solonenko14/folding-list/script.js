let accButtons = document.querySelectorAll('.accordion');
let info = document.querySelectorAll('.info');

accButtons.forEach(button=>{
    button.addEventListener('click',function(){
        if (this.nextElementSibling.classList.contains('show')){
            this.nextElementSibling.classList.remove('show');
            return;
        }
        info.forEach(inf=>{
            inf.classList.remove('show');
        })
        this.nextElementSibling.classList.toggle('show');
    })
})
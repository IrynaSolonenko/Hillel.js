let listenedBlocks = document.querySelectorAll('.color');
let listenedBlock;

listenedBlocks.forEach(listenedBlock => {
        listenedBlock.addEventListener('click', cont);

});
function cont(event) {
    if (event.target.className === 'color') {
        event.target.classList.toggle('show')
    }

    let outerBlock;

    if (event.target.classList.contains('color')) {
        outerBlock = event.target;
    } else {
        outerBlock = event.target.closest('.color');
    }
    if (!outerBlock) return;
    let innerBlock = outerBlock.querySelector('[data-color]');
    innerBlock.classList.toggle('show');
    // listenedBlock.removeEventListener("click", cont)
}

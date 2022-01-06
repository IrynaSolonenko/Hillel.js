let listSub;
let listLink;
let arr = [];
function getBookList(part, chapter, view) {
    let list = document.querySelectorAll('.list');
    if (part === 1) {
        listSub = (list[0].getElementsByClassName('list-sub')[chapter - 1]);
    } else if (part === 2) {
        listSub = (list[1].getElementsByClassName('list-sub')[chapter - 1]);
    } else if (part === 3) {
        listSub = (list[2].getElementsByClassName('list-sub')[chapter - 1]);
    } else if (part !== part || !part >= 1 || !part <= 3 || (typeof part) !== 'Number') {
        console.warn('the entered data "part" is incorrect');
    }
    listLink = listSub.querySelectorAll('.list-sub__link');
    for (let i = 0; i < listLink.length; i += 1) {
        if (view === 'dash') {
            let elem = listLink[i];
            console.log(`${'-'} ${elem.innerText}`);
            arr.push(`${'-'} ${elem.innerText}`);
        } else if (view === 'number') {
            let numberNum = (i + 1) + '. ' + listLink[i].innerText;
            console.log(numberNum);
            arr.push(numberNum);
        } else if (view === 'current') {
            let currentNum = (i + 1) + ' ' + listLink[i].innerText;
            console.log(`${chapter}.${currentNum}`)
            arr.push(chapter, currentNum);
        } else if (view !== view || (typeof view) !== 'String') {
            console.warn('the entered data "view" is incorrect')
        }  else if (chapter !== chapter || chapter < 0 || chapter > 28 || (typeof chapter) !== 'Number') {
            console.warn('the entered data "chapter" is incorrect');
        }
    }

    console.table(arr)
}
getBookList(17, 1,  'dash')
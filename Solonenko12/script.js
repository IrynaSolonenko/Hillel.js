let listSub;
let listLink;
let arr = [];
function getBookList(part, chapter, view) {
    let list1 = document.querySelectorAll('.list')[0];
    let list2 = document.querySelectorAll('.list')[1];
    let list3 = document.querySelectorAll('.list')[2];
    if (part === 1) {
        listSub = (list1.getElementsByClassName('list-sub')[chapter - 1]);
    } else if (part === 2) {
        listSub = (list2.getElementsByClassName('list-sub')[chapter - 1]);
    } else if (part === 3) {
        listSub = (list3.getElementsByClassName('list-sub')[chapter - 1]);
    }
    listLink = listSub.querySelectorAll('.list-sub__link');
    if (view === 'dash') {
        for (let elem of listLink) {
            console.log(`${'-'} ${elem.innerText}`);
            arr.push(`${'-'} ${elem.innerText}`);
        }
        console.table(arr)
    } else if(view === 'number') {
        for ( let i=0; i < listLink.length; i += 1) {
           let numberNum = (i+1) + '. ' + listLink[i].innerText;
            console.log(numberNum);
            arr.push(numberNum);
        }
        console.table(arr)
        } else if (view === 'current'){
        for ( let i=0; i < listLink.length; i += 1) {
            let currentNum = (i + 1) +' '+ listLink[i].innerText;
            console.log(`${chapter}.${currentNum}`)
            a.push(chapter, currentNum)
        }
        console.table(arr)
    }
}
getBookList(1, 3, 'number')
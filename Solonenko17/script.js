let addMassage = document.querySelector('.message');
let addButton = document.querySelector('.add');
let todoList = [];
let todo = document.querySelector('.todo');
let closedButton = document.querySelectorAll('.close');
let li = todo.querySelector('li');


addButton.addEventListener('click', function () {
    let newTodo = {
        todo: addMassage.value,
        checked: false,
        important: false
    }
    todoList.push(newTodo);
    displayMessages();
//     addMassage.value = '';
// todoList.splice(3, [todoList.length]);
// });

    function displayMessages() {
        let displayMessage = '';
        todoList.forEach(function (item, i) {
            displayMessage += `
        <li><input type="checkbox" id="item_${i}" ${item.checked ? 'checked' : ''}>
        <label for="item_${i}">${item.todo}</label><span class="closed">[x]</span>
        </li>
        `;
            todo.innerHTML = displayMessage;
        })

    }
})



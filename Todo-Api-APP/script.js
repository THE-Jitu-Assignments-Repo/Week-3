/*
- Fetch API - todos
- Use Promises
- create a form to be you add new todos
- Displays all todos in the UI
- Separate completed tasks and incomplete tasks.
*/

let incompleteTodos;
let completeTodos;
let todos;

const url = 'https://jsonplaceholder.typicode.com/todos?_limit=5';

const fetchData = fetch(url);

fetchData.then((response) => {
    let data = response.json();

    return data;
}).then(data => {
    todos = data;
    paintTodos(todos)
    return todos;
})


let input = document.querySelector('.add-input');
let addButton = document.querySelector('.add-button')
let Add = document.querySelector('.addme')

let newT;


function postData(todoNew) {
    fetch(url, {
            method: "POST",
            body: JSON.stringify(todoNew),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then(res => res.json())
        .then((res) => {

            todos.unshift(res)
            paintTodos(todos)

        })
}


addButton.addEventListener('click', (e) => {
    e.preventDefault()
    todoNew = {
        title: input.value,
        completed: false,
        userId: 1
    }

    // console.log(todoNew);
    inputValid()
    input.value = ''
})

function inputValid() {
    if (input.value === "") {
        alert("Error: Input empty")
    } else {
        postData(todoNew)
    }
}






let todoDiv = document.querySelector('.todo-page');



function paintTodos(todos) {
    let results = ''

    todos.map((el, index) => {
        results += `
            <div class="todo-list">
            <span>${el.title}</span>
            <div class="icons--change">
            <span class="status-color">${el.completed ? "complete" : "Pending"}</span>
            <input type="checkbox" ${el.completed && "checked"}  onclick="CLICKED(${index})">
            <button class="delete" onclick="handleDelete(${index})"><img src="./images/delete.png" alt="delete" width="16px"></button>
            </div>
            
            </div>

            `
    })

    todoDiv.innerHTML = results



}

let completedStatus = document.querySelector('.status-complete');
let incompletedStatus = document.querySelector('.status-incomplete');
let allTask = document.querySelector('.status-all');

completedStatus.addEventListener('click', (e) => {
    e.preventDefault();

    completeTodos = todos.filter(todos => todos.completed === true);
    paintTodos(completeTodos)
    // console.log(todos);
})

incompletedStatus.addEventListener('click', (e) => {
    e.preventDefault();
    // paintTodos(incompleteTodos);
    incompleteTodos = todos.filter(todos => todos.completed === false);

    paintTodos(incompleteTodos)


})

allTask.addEventListener('click', (e) => {
    e.preventDefault();
    paintTodos(todos);

})


function CLICKED(e) {

    todos[e].completed = !todos[e].completed

    fetch(`https://jsonplaceholder.typicode.com/todos/${e}`, {
            method: "PATCH",
            body: JSON.stringify({
                completed: true,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then(res => res.json())
        .then((res) => {

            paintTodos(todos)
        })
    // paintTodos(todos)

}


function handleDelete(e) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${e}`, {
        method: 'DELETE'
    })
    todos.splice(e, 1)

    paintTodos(todos)
}

//solve the delete part, it should not filter all todos when clicked
// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);



todoButton.addEventListener('click', addTodo);

todoList.addEventListener('click', deleteCheck);

filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(Event) {

    // Prevent form from submitting
    event.preventDefault();
    console.log('hello');

    // Todo Div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo);

    // Add todo to localStorage
    saveLocalTodos(todoInput.value);

    // Check mark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Check trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append to list
    todoList.appendChild(todoDiv);

    // Clear todo input value
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;

    // Delete todo
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;

        // Animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    // Check mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {

    const todos = todoList.childNodes;

    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });

}

function saveLocalTodos(todo) {
    // Check --- Do I already have thing in there?
    let todos;
    // If have the array (todo itens)
    if (localStorage.getItem('todos') === null) {
        // Create an empty array
        todos = [];
    } else {
        // Get the array
        todos = JSON.parse(localStorage.getItem('todos'));
    }


    todos.push(todo);

    // Push to the localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    // Check --- Do I already have thing in there?
    let todos;
    // If have the array (todo itens)
    if (localStorage.getItem('todos') === null) {
        // Create an empty array
        todos = [];
    } else {
        // Get the array
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        // Todo Div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");

        // Create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo);

        // Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        // Check trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        // Append to list
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodos(todo) {
    // Check --- Do I already have thing in there?
    let todos;
    // If have the array (todo itens)
    if (localStorage.getItem('todos') === null) {
        // Create an empty array
        todos = [];
    } else {
        // Get the array
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    // When the To Do is deleted, we access the text of the array that is the To Do text. 
    // With the To Do text we serch what is its position, to remove it
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1); // remove 1 item 

    // Remove from localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}
"use strict";
class TodoApp {
    constructor() {
        this.todos = [];
        this.todoList = document.getElementById('todoList');
        const form = document.getElementById('todoForm');
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }
    handleFormSubmit(event) {
        event.preventDefault();
        const input = document.getElementById('todoInput');
        const task = input.value.trim();
        if (task) {
            this.addTodo(task);
            input.value = '';
        }
    }
    addTodo(task) {
        const todo = {
            id: this.todos.length + 1,
            task,
            completed: false,
        };
        this.todos.push(todo);
        this.render();
    }
    completeTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.render();
        }
    }
    render() {
        this.todoList.innerHTML = '';
        this.todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = todo.completed ? 'completed' : '';
            li.innerHTML = `
          <span>${todo.task}</span>
          <button class="complete-btn">Done</button>
        `;
            const completeButton = li.querySelector('.complete-btn');
            completeButton.addEventListener('click', () => this.completeTodo(todo.id));
            this.todoList.appendChild(li);
        });
    }
}
new TodoApp();

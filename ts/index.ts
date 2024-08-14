interface Todo {
    id: number;
    task: string;
    completed: boolean;
  }
  
  class TodoApp {
    private todos: Todo[] = [];
    private todoList: HTMLUListElement;
  
    constructor() {
      this.todoList = document.getElementById('todoList') as HTMLUListElement;
      const form = document.getElementById('todoForm') as HTMLFormElement;
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }
  
    private handleFormSubmit(event: SubmitEvent): void {
      event.preventDefault();
      const input = document.getElementById('todoInput') as HTMLInputElement;
      const task = input.value.trim();
      if (task) {
        this.addTodo(task);
        input.value = '';
      }
    }
  
    private addTodo(task: string): void {
      const todo: Todo = {
        id: this.todos.length + 1,
        task,
        completed: false,
      };
      this.todos.push(todo);
      this.render();
    }
  
    private completeTodo(id: number): void {
      const todo = this.todos.find(t => t.id === id);
      if (todo) {
        todo.completed = !todo.completed;
        this.render();
      }
    }
  
    private render(): void {
      this.todoList.innerHTML = '';
      this.todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        li.innerHTML = `
          <span>${todo.task}</span>
          <button class="complete-btn">Done</button>
        `;
        const completeButton = li.querySelector('.complete-btn') as HTMLButtonElement;
        completeButton.addEventListener('click', () => this.completeTodo(todo.id));
        this.todoList.appendChild(li);
      });
    }
  }
  
  new TodoApp();
  
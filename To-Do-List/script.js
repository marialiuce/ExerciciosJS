document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.querySelector('form');
    const taskInput = document.querySelector('#taskInput'); 
    const taskList = document.querySelector('#taskList');   
    const countSpan = document.querySelector('#count');
    const completedSpan = document.querySelector('#completed');

    let tasks = [];
    // Atualizar a contagem de tarefas
    function updateTaskCount() { 
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;

        countSpan.textContent = totalTasks;
        completedSpan.textContent = completedTasks;
    }

    // Renderizar as tarefas na lista
    function renderTasks() {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            if (task.completed) {
                listItem.classList.add('completed');
            }

            const taskText = document.createElement('span');
            taskText.textContent = task.text;

            const taskActions = document.createElement('div');
            taskActions.classList.add('task-actions');

            // Botão de Concluir/Desfazer
            const completeButton = document.createElement('button');
            completeButton.classList.add('complete-btn');
            completeButton.innerHTML = task.completed ? '<i class="fas fa-undo"></i>' : '<i class="fas fa-check"></i>';
            completeButton.setAttribute('title', task.completed ? 'Marcar como não concluída' : 'Marcar como concluída');
            completeButton.addEventListener('click', () => {
                toggleComplete(index);
            });

            // Botão de Excluir
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-btn');
            deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
            deleteButton.setAttribute('title', 'Excluir tarefa');
            deleteButton.addEventListener('click', () => {
                deleteTask(index);
            });

            listItem.appendChild(taskText);
            taskActions.appendChild(completeButton);
            taskActions.appendChild(deleteButton);
            listItem.appendChild(taskActions);
            taskList.appendChild(listItem);
        });

        updateTaskCount();
    }

    // Função para adicionar uma nova tarefa
    function addTask(text) {
        if (text.trim() === '') {
            alert('Por favor, digite uma tarefa!');
            return;
        }
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        renderTasks();
    }

    // Função para marcar ou desmarcar tarefa como concluída
    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    // Função para excluir uma tarefa
    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    // Envio do formulário
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        addTask(taskInput.value);
    });

    renderTasks();
});

/*
==========================================================
🌸 To Do da Pandinha
Tasks Events
==========================================================
*/

function taskEvents() {

    const form = document.querySelector("#tasks-form");
    const input = document.querySelector("#tasks-input");
    const categorySelect = document.querySelector("#task-category-select");
    const listEl = document.querySelector("#tasks-list");
    const filterBtns = document.querySelectorAll(".filter-btn");

    let currentFilter = 'all';

    if (form && input) {
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const title = input.value.trim();
            const category = categorySelect?.value || 'pessoal';

            if (!title) {
                alert('Escreve algo, Pandinha! 🌸');
                return;
            }

            window.Storage.createTask(title, category);
            input.value = "";
            input.focus();

            renderTasksList(currentFilter);
        });
    }

    if (filterBtns) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                currentFilter = btn.dataset.filter;
                renderTasksList(currentFilter);
            });
        });
    }

    if (listEl) {
        listEl.addEventListener("click", (event) => {
            const item = event.target.closest(".task");
            if (!item) return;

            const id = Number(item.dataset.id);

            if (event.target.closest(".task__check")) {
                window.Storage.toggleTask(id);
                renderTasksList(currentFilter);
                return;
            }

            if (event.target.closest(".task__delete")) {
                item.classList.add("task--removing");
                setTimeout(() => {
                    window.Storage.deleteTask(id);
                    renderTasksList(currentFilter);
                }, 180);
            }
        });
    }
}

function renderTasksList(filter = 'all') {
    const listEl = document.querySelector("#tasks-list");
    if (!listEl) return;

    const allTasks = window.Storage.getTasks();
    
    let tasks = allTasks;
    if (filter === 'pending') {
        tasks = allTasks.filter(t => !t.completed);
    } else if (filter === 'completed') {
        tasks = allTasks.filter(t => t.completed);
    }

    listEl.innerHTML = tasks.map(taskItemTemplate).join("") || `
        <li class="tasks-empty">Nenhuma tarefa por aqui. Que tal adicionar uma? 🌸</li>
    `;

    updateTaskStats(allTasks);
}

function updateTaskStats(tasks) {
    const pendingEl = document.querySelector("#tasks-pending");
    const totalEl = document.querySelector("#tasks-total");

    if (pendingEl) pendingEl.textContent = tasks.filter(t => !t.completed).length;
    if (totalEl) totalEl.textContent = tasks.length;
}

function taskItemTemplate(task) {
    const category = tasksData.categories.find(c => c.id === task.category) || tasksData.categories[0];
    return `
        <li class="task ${task.completed ? "task--done" : ""}" data-id="${task.id}">
            <button type="button" class="task__check" aria-label="Toggle task"></button>
            <div class="task__content">
                <span class="task__title">${escapeHTML(task.title)}</span>
                <span class="task__category">${category.label}</span>
            </div>
            <button type="button" class="task__delete" aria-label="Delete task">✕</button>
        </li>
    `;
}

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

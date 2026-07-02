/*
==========================================================
🌸 To Do da Pandinha
Home Template
==========================================================
*/

function homeTemplate() {

    return `

<section class="home">

    <!-- HERO -->
    <section class="home__hero">

        <h1 id="home-greeting"></h1>

        <p id="home-message"></p>

        <small id="home-date"></small>

    </section>

    <!-- SUMMARY -->
    <section class="home__summary">

        <div class="card">📋<br><strong id="home-summary-tasks">0</strong><br>Tarefas</div>

        <div class="card">🌱<br><strong>2</strong><br>Hábitos</div>

        <div class="card">🎯<br><strong>1</strong><br>Meta</div>

        <div class="card">📚<br><strong>1</strong><br>Estudo</div>

    </section>

    <!-- TASKS -->
    <section class="home__tasks">

        <h2>O que merece sua atenção hoje</h2>

        <form id="home-task-form" class="home__task-form" novalidate>

            <input
                type="text"
                id="home-task-input"
                class="home__task-input"
                placeholder="Adicionar uma tarefa..."
                autocomplete="off"
                maxlength="120">

            <button type="submit" class="home__task-add" aria-label="Adicionar tarefa">+</button>

        </form>

        <small id="home-task-error" class="home__task-error" hidden>
            Escreve algo antes de adicionar 🌸
        </small>

        <ul id="home-task-list" class="home__task-list"></ul>

    </section>

    <!-- HABITS -->
    <section class="home__habits">

        <h2>Cuide de você</h2>

        <div class="habit">💧 Beber água</div>
        <div class="habit">📖 Ler 20 minutos</div>

    </section>

    <!-- GOAL -->
    <section class="home__goal">

        <h2>Seu foco da semana</h2>

        <div class="home__goal-title-row" id="home-goal-title-row">
            <p id="home-goal-title" class="home__goal-title"></p>
            <button type="button" id="home-goal-edit-btn" class="home__goal-edit-btn" aria-label="Editar foco da semana">✏️</button>
        </div>

        <form id="home-goal-form" class="home__goal-form" hidden>
            <input type="text" id="home-goal-input" class="home__goal-input" maxlength="80" placeholder="Qual é o seu foco esta semana?">
            <div class="home__goal-form-actions">
                <button type="submit" class="home__goal-save-btn">Salvar</button>
                <button type="button" id="home-goal-cancel-btn" class="home__goal-cancel-btn">Cancelar</button>
            </div>
        </form>

        <div class="progress">
            <div class="progress__fill" id="home-goal-progress-fill" style="width: 0%"></div>
        </div>

        <span class="progress__label" id="home-goal-progress-label">Calculando...</span>

    </section>

    <!-- PANDA CORNER -->
    <section class="home__corner">

        <span class="home__corner-icon">🐼</span>

        <h2>Cantinho da Pandinha</h2>

        <p id="home-thought"></p>

    </section>

</section>

`;

}

/*
==========================================================
Task list rendering
==========================================================
*/

function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}

function taskItemTemplate(task) {

    return `

        <li class="task ${task.completed ? "task--done" : ""}" data-id="${task.id}">

            <button
                type="button"
                class="task__check"
                aria-label="${task.completed ? "Marcar como pendente" : "Marcar como concluída"}">
            </button>

            <span class="task__title">${escapeHTML(task.title)}</span>

            <button type="button" class="task__delete" aria-label="Remover tarefa">✕</button>

        </li>

    `;

}

function taskListTemplate(tasks) {

    if (!tasks.length) {
        return `
            <li class="home__task-empty">
                Nenhuma tarefa por aqui ainda. Que tal adicionar a primeira? 🌸
            </li>
        `;
    }

    return tasks.map(taskItemTemplate).join("");

}

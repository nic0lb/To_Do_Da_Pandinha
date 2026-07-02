/* ==========================================================
  To Do da Pandinha - Templates do Módulo de Tarefas
========================================================== */

/**
 * Retorna a estrutura principal da página de tarefas, com filtros e categorias.
 */
function tasksTemplate() {
    return `
<section class="tasks-page">
    <div class="tasks-header">
        <h1>Minhas Tarefas</h1>
        <div class="tasks-stats">
            <span><strong id="tasks-pending">0</strong> pendentes</span>
            <span><strong id="tasks-total">0</strong> no total</span>
        </div>
    </div>

    <!-- Formulário com seleção de Categoria (Tag) -->
    <form id="tasks-form" class="tasks-form">
        <select id="task-category-select" class="task-category-select">
            <option value="pessoal">🌸 Pessoal</option>
            <option value="estudos">📚 Estudos</option>
            <option value="trabalho">💼 Trabalho</option>
            <option value="outros">✨ Outros</option>
        </select>
        <input type="text" id="tasks-input" placeholder="O que vamos fazer hoje, Pandinha?" maxlength="150">
        <button type="submit">+</button>
    </form>

    <!-- Filtros Rápidos (Abas) -->
    <div class="tasks-filters">
        <button class="filter-btn active" data-filter="all">Todas</button>
        <button class="filter-btn" data-filter="pending">Pendentes</button>
        <button class="filter-btn" data-filter="completed">Concluídas</button>
    </div>

    <ul id="tasks-list" class="tasks-list"></ul>
</section>
    `;
}

/**
 * Renderiza as linhas de tarefas com base no filtro ativo e adiciona as tags visuais.
 */
function fullTaskListTemplate(tasks, filter = "all") {
    // Filtra as tarefas antes de gerar o HTML
    const filteredTasks = tasks.filter(task => {
        if (filter === "pending") return !task.completed;
        if (filter === "completed") return task.completed;
        return true; // "all"
    });

    if (!filteredTasks || filteredTasks.length === 0) {
        return `
            <li class="task-empty">
                Nenhuma tarefa por aqui neste filtro... ✨
            </li>
        `;
    }

    return filteredTasks.map(task => {
        const date = task.createdAt ? new Date(task.createdAt).toLocaleDateString('pt-BR') : '';
        const categoryClass = task.category ? `task--cat-${task.category}` : 'task--cat-outros';
        
        return `
            <li class="task ${task.completed ? 'task--done' : ''} ${categoryClass}" data-id="${task.id}">
                <button type="button" class="task__check" aria-label="Marcar tarefa"></button>
                <div class="task__content">
                    <span class="task__title">${task.title}</span>
                    <span class="task__tag-badge">#${task.category || 'outros'}</span>
                </div>
                <span class="task__date">${date}</span>
                <button type="button" class="task__delete" aria-label="Remover tarefa">🗑️</button>
            </li>
        `;
    }).join('');
}

// Vincula as funções ao escopo global para o task.js encontrá-las
window.tasksTemplate = tasksTemplate;
window.fullTaskListTemplate = fullTaskListTemplate;
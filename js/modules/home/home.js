/*
==========================================================
🌸 To Do da Pandinha
Home Component (Atualizado com Dados Reais)
==========================================================
*/

function renderHome() {
    const main = document.querySelector("#main-content");
    if (!main) return;

    main.innerHTML = homeTemplate();

    hydrateHome();
    renderTaskList();
    renderHomeHabitsSummary(); // ← Nova integração de Hábitos
    renderHomeGoal(); // ← Foco da semana (título editável + progresso real)
    homeEvents();
}

/**
 * Renderiza e atualiza a lista de tarefas resumida na Home.
 */
function renderTaskList() {
    const listEl = document.querySelector("#home-task-list");
    if (!listEl) return;

    const tasks = window.Storage.getTasks();

    // Injeta as tarefas usando o template existente
    if (typeof taskListTemplate === "function") {
        listEl.innerHTML = taskListTemplate(tasks);
    } else {
        // Fallback caso o template ainda não tenha carregado
        listEl.innerHTML = tasks.length === 0 
            ? `<li class="task-empty">Nenhuma tarefa pendente para hoje! 🌸</li>`
            : tasks.slice(0, 5).map(t => `<li class="task ${t.completed ? 'task--done' : ''}">${t.title}</li>`).join('');
    }

    updateTaskSummary(tasks);
}

/**
 * Atualiza o contador de tarefas pendentes no card do painel principal.
 */
function updateTaskSummary(tasks) {
    const summaryEl = document.querySelector("#home-summary-tasks");
    if (!summaryEl) return;

    const pending = tasks.filter(task => !task.completed).length;
    summaryEl.textContent = pending;
}

/**
 * Nova Função: Puxa os hábitos do localStorage e atualiza o card de resumo de hábitos na Home.
 */
function renderHomeHabitsSummary() {
    const summaryHabitsEl = document.querySelector("#home-summary-habits");
    if (!summaryHabitsEl) return;

    const habits = window.Storage.getHabits();
    const completed = habits.filter(h => h.completedToday).length;
    
    // Atualiza o número no contador de hábitos concluídos da Home
    summaryHabitsEl.textContent = `${completed}/${habits.length}`;
}

/**
 * Renderiza o card "Seu foco da semana": título editável salvo no
 * localStorage (via Storage) e progresso calculado a partir de
 * tarefas concluídas na semana + hábitos concluídos hoje.
 */
function renderHomeGoal() {
    const titleEl = document.querySelector("#home-goal-title");
    const fillEl = document.querySelector("#home-goal-progress-fill");
    const labelEl = document.querySelector("#home-goal-progress-label");

    if (!titleEl || !fillEl || !labelEl) return;

    const title = window.Storage.getGoalTitle(homeData.goal.defaultTitle);
    const progress = computeWeeklyFocusProgress();

    titleEl.textContent = title;
    fillEl.style.width = `${progress}%`;
    labelEl.textContent = `${progress}% do caminho já percorrido`;
}

/**
 * Alimenta os textos dinâmicos da Home (Saudações, Frases e a Data Atual).
 */
function hydrateHome() {
    const greetingEl = document.querySelector("#home-greeting");
    const messageEl = document.querySelector("#home-message");
    const dateEl = document.querySelector("#home-date");
    const thoughtEl = document.querySelector("#home-thought");

    const today = new Date();

    // Verificação de segurança caso o arquivo home.data.js demore a carregar
    const data = typeof homeData !== "undefined" ? homeData : {
        greetings: ["Olá, Pandinha!"],
        messages: ["Pronta para organizar o seu dia?"],
        thoughts: ["Um passo de cada vez e chegamos lá. 🌸"]
    };

    const randomGreeting = data.greetings[Math.floor(Math.random() * data.greetings.length)];
    const randomMessage = data.messages[Math.floor(Math.random() * data.messages.length)];
    const randomThought = data.thoughts[Math.floor(Math.random() * data.thoughts.length)];

    if (greetingEl) greetingEl.textContent = randomGreeting;
    if (messageEl) messageEl.textContent = randomMessage;
    if (thoughtEl) thoughtEl.textContent = randomThought;

    if (dateEl) {
        dateEl.textContent = today.toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "numeric",
            month: "long"
        });
    }
}

// Expõe globalmente para o sistema de rotas funcionar perfeitamente
window.renderHome = renderHome;
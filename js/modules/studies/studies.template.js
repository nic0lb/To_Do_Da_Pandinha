/* ==========================================================
  To Do da Pandinha - Templates do Módulo de Estudos
========================================================== */

/**
 * Estrutura principal da página de estudos.
 */
function studiesTemplate() {
    return `
<section class="studies-page">
    <div class="studies-header">
        <h1>Estudos</h1>
        <p class="studies-subtitle">Matérias, foco e tempo dedicado</p>
    </div>

    <!-- Pomodoro -->
    <div class="pomodoro-card">
        <div class="pomodoro-mode" id="pomodoro-mode">Foco</div>
        <div class="pomodoro-timer" id="pomodoro-timer">25:00</div>
        <div class="pomodoro-controls">
            <button type="button" id="pomodoro-start" class="pomodoro-btn pomodoro-btn--primary">Iniciar</button>
            <button type="button" id="pomodoro-pause" class="pomodoro-btn" disabled>Pausar</button>
            <button type="button" id="pomodoro-reset" class="pomodoro-btn">Reiniciar</button>
        </div>
        <label class="pomodoro-subject-label" for="pomodoro-subject-select">Estudando:</label>
        <select id="pomodoro-subject-select" class="pomodoro-subject-select"></select>
    </div>

    <!-- Total estudado -->
    <div class="studies-total">
        <span>⏱️ Total estudado:</span>
        <strong id="studies-total-minutes">0 min</strong>
    </div>

    <!-- Formulário para nova matéria -->
    <form id="studies-form" class="studies-form">
        <input type="text" id="studies-input" placeholder="Adicionar matéria..." maxlength="80">
        <button type="submit">+</button>
    </form>

    <div id="studies-list" class="studies-list"></div>
</section>
    `;
}

/**
 * Renderiza a lista de matérias com checkbox e minutos acumulados.
 */
function studiesListTemplate(subjects) {
    if (!subjects || subjects.length === 0) {
        return `<p class="studies-empty">Nenhuma matéria ainda. Adicione uma para começar! 🌸</p>`;
    }

    return subjects.map(subjectItemTemplate).join("");
}

function subjectItemTemplate(subject) {
    return `
        <div class="subject ${subject.studiedToday ? "subject--done" : ""}" data-id="${subject.id}">
            <button type="button" class="subject__check" aria-label="Marcar matéria estudada hoje"></button>
            <div class="subject__content">
                <span class="subject__icon">${subject.icon}</span>
                <div>
                    <span class="subject__title">${escapeStudiesHTML(subject.title)}</span>
                    <span class="subject__minutes">⏱️ ${subject.minutes || 0} min</span>
                </div>
            </div>
            <button type="button" class="subject__delete" aria-label="Remover matéria">✕</button>
        </div>
    `;
}

/**
 * Gera as <option> do select de matérias usado pelo pomodoro.
 */
function subjectOptionsTemplate(subjects) {
    if (!subjects || subjects.length === 0) {
        return `<option value="">Nenhuma matéria cadastrada</option>`;
    }
    return subjects.map(s => `<option value="${s.id}">${s.icon} ${escapeStudiesHTML(s.title)}</option>`).join("");
}

function escapeStudiesHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

window.studiesTemplate = studiesTemplate;
window.studiesListTemplate = studiesListTemplate;
window.subjectItemTemplate = subjectItemTemplate;
window.subjectOptionsTemplate = subjectOptionsTemplate;

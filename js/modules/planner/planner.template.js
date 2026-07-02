/* ==========================================================
  To Do da Pandinha - Templates do Módulo de Planejamento
========================================================== */

/**
 * Estrutura principal da página de planejamento.
 */
function plannerTemplate() {
    return `
<section class="planner-page">
    <div class="planner-header">
        <h1>Planejamento</h1>
        <p class="planner-subtitle">Organize sua semana em blocos de tempo</p>
    </div>

    <form id="planner-form" class="planner-form">
        <input type="text" id="planner-input" placeholder="O que você quer planejar?" maxlength="150">

        <select id="planner-day-select" class="planner-select">
            ${plannerData.days.map(day => `<option value="${day.id}">${day.label}</option>`).join("")}
        </select>

        <select id="planner-block-select" class="planner-select">
            ${plannerData.timeBlocks.map(block => `<option value="${block.id}">${block.label}</option>`).join("")}
        </select>

        <input type="time" id="planner-time-input" class="planner-time">

        <button type="submit">+</button>
    </form>

    <div id="planner-days" class="planner-days"></div>
</section>
    `;
}

/**
 * Renderiza a grade semanal completa (um bloco por dia).
 */
function plannerWeekTemplate() {
    return plannerData.days.map(day => {
        const plans = getPlansByDay(day.id);
        return `
            <div class="planner-day" data-day="${day.id}">
                <h3 class="planner-day__title">${day.label}</h3>
                <ul class="planner-day__list" data-day-list="${day.id}">
                    ${plans.length ? plans.map(planItemTemplate).join("") : `
                        <li class="planner-empty">Nada planejado ainda ✨</li>
                    `}
                </ul>
            </div>
        `;
    }).join("");
}

/**
 * Renderiza um item de plano individual.
 */
function planItemTemplate(plan) {
    const block = plannerData.timeBlocks.find(b => b.id === plan.block) || plannerData.timeBlocks[0];

    return `
        <li class="planner-item ${plan.done ? "planner-item--done" : ""}" data-id="${plan.id}">
            <button type="button" class="planner-item__check" aria-label="Concluir plano"></button>
            <div class="planner-item__content">
                <span class="planner-item__title">${escapePlannerHTML(plan.title)}</span>
                <span class="planner-item__meta">${block.label}${plan.time ? " · " + plan.time : ""}</span>
            </div>
            <button type="button" class="planner-item__delete" aria-label="Remover plano">✕</button>
        </li>
    `;
}

function escapePlannerHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

window.plannerTemplate = plannerTemplate;
window.plannerWeekTemplate = plannerWeekTemplate;
window.planItemTemplate = planItemTemplate;

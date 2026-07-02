/*
==========================================================
🌸 To Do da Pandinha
Planner Module
==========================================================
*/

function renderPlanner() {

    const main = document.querySelector("#main-content");

    if (!main) return;

    main.innerHTML = plannerTemplate();

    renderPlannerDays();

    plannerEvents();

}

// Expõe a função globalmente para ser usada pelo routes.js
window.renderPlanner = renderPlanner;

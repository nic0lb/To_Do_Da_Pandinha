/*
==========================================================
🌸 To Do da Pandinha
Tasks Module
==========================================================
*/

function renderTasks() {

    const main = document.querySelector("#main-content");

    if (!main) return;

    main.innerHTML = tasksTemplate();

    renderTasksList('all');

    taskEvents();

}

/*
==========================================================
🌸 To Do da Pandinha
Habits Module
==========================================================
*/

function renderHabits() {

    const main = document.querySelector("#main-content");

    if (!main) return;

    main.innerHTML = habitsTemplate();

    renderHabitsList();

    habitsEvents();

}
